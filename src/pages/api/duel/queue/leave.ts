export const prerender = false;
import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

// /api/duel/queue/leave
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

    if (!user.id || !gameId) {
        return new Response(
            JSON.stringify({ message: "Missing required fields" }),
            { status: 400 }
        );
    }

    const { error: deleteError } = await supabase
        .from("duels_queue")
        .delete()
        .eq("user", user.id)

    if (deleteError) {
        return new Response(
            JSON.stringify({ message: deleteError.message }),
            { status: 500 }
        );
    }

    return redirect("/duels");
};
