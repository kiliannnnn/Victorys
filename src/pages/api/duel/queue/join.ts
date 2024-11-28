export const prerender = false;
import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
    const formData = await request.formData();
    const game_id = formData.get("game_id")?.toString();
    
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
    
    if (!game_id) {
        return new Response(
            JSON.stringify({ message: "Missing required game_id field" }),
            { status: 400 }
        );
    }
    
    const { error: insertError } = await supabase.from("duels_queue").insert({
        user: user.id,
        game: parseInt(game_id, 10),
    });
    
    if (insertError) {
        return new Response(
            JSON.stringify({ message: insertError.message }),
            { status: 500 }
        );
    }
    
/*     return new Response(
        JSON.stringify({ message: "Successfully joined the queue" }),
        { status: 200 }
    ); */
    return redirect("/duels");
};
