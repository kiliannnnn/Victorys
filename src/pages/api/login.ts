export const prerender = false;
import type { APIRoute } from "astro";
import { supabase } from "@/pages/api/supabase";

export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
        return new Response(
            JSON.stringify({
                message: "Missing required fields",
            }),
            { status: 400 }
        );
    }
    const { data } = await supabase.auth.signInWithPassword({
        email: email as string,
        password: password as string,
    })
    return new Response(
        JSON.stringify({
            message: "Login successfully : " + data,
        }),
        { status: 200 }
    );
};