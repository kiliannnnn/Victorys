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
    
    const { error: duelError } = await supabase.from("duels").insert({
        player_1: user.id,
        player_2: opponent.user,
        game: gameId,
        status: "in_progress",
        group: groupId,
    });
    
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

    return redirect("/duels");
};
