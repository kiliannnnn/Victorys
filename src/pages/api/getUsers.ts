export const prerender = false;
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
    "https://your-supabase-url.supabase.co",
    "your-service-role-key" // Secure service role key
);

export async function get({ }) {
    try {
        const { data: users, error } = await supabaseAdmin.auth.admin.listUsers();
/*         const { data: { users }, error } = await supabase.auth.admin.listUsers();
 */

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        return new Response(JSON.stringify(users), { status: 200 });
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
