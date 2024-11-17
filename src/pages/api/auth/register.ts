export const prerender = false;
import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
        return new Response(
            JSON.stringify({
                message: "Missing required fields",
            }),
            { status: 400 }
        );
    }

    const { error } = await supabase.auth.signUp({
        email: email as string,
        password: password as string,
    });

    if (error) {
        return new Response(error.message, { status: 500 });
    }
    
    return redirect("/signin");
};
