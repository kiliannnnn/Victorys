export const prerender = false;
import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const GET: APIRoute = async ({ cookies }) => {
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
    
    const { data: duel, error: duelError } = await supabase
    .from("duels")
    .select("*")
    .or(`player_1.eq.${user.id},player_2.eq.${user.id}`)
    .eq("status", "in_progress")
    .single();
    
    if (duelError || !duel) {
        return new Response(
            JSON.stringify({ message: "No ongoing duel found" }),
            { status: 404 }
        );
    }
    
    return new Response(
        JSON.stringify({ duel }),
        { status: 200 }
    );
};
