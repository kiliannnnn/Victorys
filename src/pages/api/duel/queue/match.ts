export const prerender = false;
import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const POST: APIRoute = async ({ request, cookies }) => {
    const accessToken = cookies.get("sb-access-token");
    
    if (!accessToken) {
        return new Response(
            JSON.stringify({ message: "Unauthorized" }),
            { status: 401 }
        );
    }
    
    const { data, error: authError} = await supabase.auth.getUser(accessToken.value);
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
    
    const { error: duelError } = await supabase.from("duels").insert({
        player_1: user.id,
        player_2: opponent.user,
        game: gameId,
        status: "in_progress",
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
    
    return new Response(
        JSON.stringify({ message: "Duel created successfully" }),
        { status: 200 }
    );
};
