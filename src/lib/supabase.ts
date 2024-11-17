import { AuthAdminApi, createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY,
);

export const supabaseAdmin = supabase.auth.admin;

/* const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseKey || !supabaseUrl) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_KEY environment variables");
}

export const supabase = createClient(
  supabaseUrl, 
  supabaseKey,
  {
    auth: {
      flowType: "pkce",
    },
  },
);
 */