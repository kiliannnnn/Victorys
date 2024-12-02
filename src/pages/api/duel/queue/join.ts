export const prerender = false;
import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

// /api/duel/queue/join
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
    const formData = await request.formData();
    const gameId = formData.get("game_id")?.toString();

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

    if (!user.id || !gameId) {
        return new Response(
            JSON.stringify({ message: "Missing required fields" }),
            { status: 400 }
        );
    }

    const { data: existingQueue } = await supabase
        .from("duels_queue")
        .select("*")
        .eq("user", user.id);

    let userQueue = 0;
    userQueue = <number>existingQueue?.length;
    if (userQueue > 0) {
        return new Response(
            JSON.stringify({ message: "You are already in the queue" }),
            { status: 200 }
        );
    }

    const { error: insertError } = await supabase.from("duels_queue").insert([{ user: user.id, game: gameId }]);
    if (insertError) {
        return new Response(
            JSON.stringify({ message: insertError.message }),
            { status: 500 }
        );
    }

    return redirect("/api/duel/queue/match");
};
