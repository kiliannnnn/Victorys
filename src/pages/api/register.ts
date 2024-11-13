export const prerender = false;
import type { APIRoute } from "astro";
import { supabase } from "@/pages/api/supabase";

export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData();
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!username || !email || !password) {
        return new Response(
            JSON.stringify({
                message: "Missing required fields",
            }),
            { status: 400 }
        );
    }

    const { data, error } = await supabase.auth.signUp({
        email: email as string,
        password: password as string,
        options: {
            data: {
                username: username as string,
                email: email as string,
                password: password as string,
            },
        },
    });

    console.log("data : ", data);
    console.log("error : ", error);
    
    return new Response(
        JSON.stringify({
            message: data ? "User created" : error?.message,
        }),
        { status: 200 }
    );
};
