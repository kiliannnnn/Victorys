export const prerender = false;
import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";
import type { Group } from "@/lib/supabase";

export const POST: APIRoute = async ({ cookies, redirect }) => {

    // user auth check
    const accessToken = cookies.get("sb-access-token");
    if (!accessToken) {
        return new Response(
            JSON.stringify({ message: "Unauthorized" }),
            { status: 401 }
        );
    }
    const { data, error: authError } = await supabase.auth.getUser(accessToken.value);
    let user = null;
    if (data?.user) {
        user = data.user;
    }
    if (authError || !user) {
        return new Response(
            JSON.stringify({ message: "Invalid session" }),
            { status: 401 }
        );
    }
    // end user auth check
    
    const { data: queueEntry, error: queueError } = await supabase
    .from("duels_queue")
    .select("*")
    .eq("user", user.id)
    .single();
    
    if (queueError || !queueEntry) {
        return new Response(
            JSON.stringify({ message: "User is not in the queue" }),
            { status: 400 }
        );
    }
    
    const gameId = queueEntry.game;
    
    const { data: opponent, error: opponentError } = await supabase
    .from("duels_queue")
    .select("*")
    .eq("game", gameId)
    .neq("user", user.id)
    .limit(1)
    .single();
    
    if (opponentError || !opponent) {
        return new Response(
            JSON.stringify({ message: "No opponents found in the queue" }),
            { status: 200 }
        );
    }

    const { data: members, error: groupError } = await supabase
    .from("members")
    .select("*")
    .in('user', [user.id, opponent.user]);
    if (groupError) {
        return new Response(
            JSON.stringify({ message: "Failed to retrieve groups" }),
            { status: 500 }
        );
    }

    const groupCounts = members.reduce((acc, member) => {
        acc[member.group] = (acc[member.group] || 0) + 1;
        return acc;
    }, {});
  
    const privateGroups = Object.keys(groupCounts)
        .filter(groupId => groupCounts[groupId] === 2)
        .map(Number);

    const { data: groups, error: groupsError } = await supabase
    .from("groups")
    .select("*")
    .in('id', privateGroups)
    .eq("private", true);
    if (groupsError) {
        return new Response(
            JSON.stringify({ message: "Failed to retrieve groups" }),
            { status: 500 }
        );
    }
    let groupId: number = groups[0]?.id;

    if (groups.length == 0) {
        const { data: dataGroup, error: groupError } = await supabase
        .from('groups')
        .insert([
            { name: '' },
        ])
        .select()
        .single();

        if (groupsError) {
            return new Response(
                JSON.stringify({ message: "Failed to create new group" }),
                { status: 500 }
            );
        }

        groupId = dataGroup.id;

        const { data: addMembersData, error: addMembersError } = await supabase
        .from('members')
        .insert([
        { user: user.id, group: groupId },
        { user: opponent.user, group: groupId },
        ])
        .select();
        
        if (addMembersError) {
            return new Response(
                JSON.stringify({ message: "Failed to create new group" }),
                { status: 500 }
            );
        }
    }

    const { data: msgData, error: msgError } = await supabase
    .from('messages')
    .insert([
    { content: 'Confirmer le duel ?', sender: "d2b0108c-6a2d-499f-96b7-5113fe40b85c", destination: groupId },
    ])
    .select();

    if (msgError) {
        return new Response(
            JSON.stringify({ message: "Failed to send message into the new group" }),
            { status: 500 }
        );
    }
    
    const { data: currentDuel, error: duelError } = await supabase.from("duels").insert({
        player_1: user.id,
        player_2: opponent.user,
        game: gameId,
        status: "in_progress",
        group: groupId,
    }).select().single();
    
    if (duelError) {
        return new Response(
            JSON.stringify({ message: "Failed to create duel" }),
            { status: 500 }
        );
    }
    
    const { error: removeError } = await supabase
    .from("duels_queue")
    .delete()
    .in("user", [user.id, opponent.user]);
    
    if (removeError) {
        return new Response(
            JSON.stringify({ message: "Failed to remove players from queue" }),
            { status: 500 }
        );
    }

    const { data: notifData, error: notifError } = await supabase
    .from('notifications')
    .insert([
    { user: user.id, title: "Match found!", content: "Found a match" },
    { user: opponent.user, title: "Match found!", content: "Found a match" },
    ])
    .select();

    if (notifError) {
        return new Response(
            JSON.stringify({ message: "Failed to send notifications" }),
            { status: 500 }
        );
    }
    const duelStartTimestamp = new Date(); // Mark the start of the duel process

    const channels = supabase.channel('wait-duel-start')
    .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `destination=eq.${groupId}` },
        async (payload) => {
            const messageContent = payload.new.content.trim();
            console.log("content : " + messageContent);
            
            const senderId = payload.new.sender;
            console.log("sender : " + senderId);
            
            const messageCreatedAt = new Date(payload.new.created);
            console.log("createdAt : " + messageCreatedAt);
            

            if (messageContent === "!start" && messageCreatedAt >= duelStartTimestamp) {
                console.log(`Player ${senderId} sent !start`);

                const { data: startMessages, error: fetchError } = await supabase
                    .from('messages')
                    .select('*')
                    .eq('destination', groupId)
                    .eq('content', '!start')
                    .gt('created', duelStartTimestamp.toISOString());

                if (fetchError) {
                    console.error("Error fetching !start messages:", fetchError);
                    return;
                }

                const startSenders = new Set(startMessages.map(msg => msg.sender));

                const players = [user.id, opponent.user];
                const allConfirmed = players.every(player => startSenders.has(player));

                if (allConfirmed) {
                    console.log("Both players confirmed! Starting the duel.");

                    const { error: updateDuelError } = await supabase
                        .from('duels')
                        .update({ status: "active" })
                        .eq('group', groupId);

                    if (updateDuelError) {
                        console.error("Error updating duel status:", updateDuelError);
                        return;
                    }

                    console.log("Duel started successfully!");
                } else {
                    console.log("Waiting for the second player to confirm.");

                    setTimeout(async () => {
                        const { data: finalStartMessages, error: finalFetchError } = await supabase
                            .from('messages')
                            .select('*')
                            .eq('destination', groupId)
                            .eq('content', '!start')
                            .gt('created', duelStartTimestamp.toISOString());

                        if (finalFetchError) {
                            console.error("Error fetching final !start messages:", finalFetchError);
                            return;
                        }

                        const finalStartSenders = new Set(finalStartMessages.map(msg => msg.sender));
                        const allConfirmedAfterTimeout = players.every(player => finalStartSenders.has(player));

                        if (allConfirmedAfterTimeout) {
                            console.log("Second player confirmed within the time limit!");
                        } else {
                            console.log("Second player did not confirm in time. Cancelling duel.");

                            const { error: deleteDuelError } = await supabase
                                .from('duels')
                                .delete()
                                .eq('group', groupId);

                            if (deleteDuelError) {
                                console.error("Error deleting duel:", deleteDuelError);
                            }

                            await supabase.from('notifications').insert([
                                { user: user.id, title: "Duel cancelled", content: "Your opponent did not confirm in time." },
                                { user: opponent.user, title: "Duel cancelled", content: "You did not confirm in time." },
                            ]);
                        }
                    }, 60000);
                }
            }
        }
    )
    .subscribe();    

    return redirect("/duels");
};
