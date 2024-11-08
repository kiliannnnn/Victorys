export const prerender = false;
import type { APIRoute } from "astro";

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!supabaseKey || !supabaseUrl) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_KEY environment variables");
}

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");
    // Validate the data - you'll probably want to do more than this
    if (!name || !email || !message) {
        return new Response(
            JSON.stringify({
                message: "Missing required fields",
            }),
            { status: 400 }
        );
    }
    // Do something with the data, then return a success response
    const supabase = createClient(supabaseUrl, supabaseKey);
    return new Response(
        JSON.stringify({
            message: supabase
        }),
        { status: 200 }
    );
};