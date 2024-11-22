import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseKey || !supabaseUrl) {
  throw new Error(supabaseKey + " " + supabaseUrl);
}

export const supabase = createClient(
  supabaseUrl,
  import.meta.env.SUPABASE_ANON_KEY,
);

export const supabaseAdmin = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
);
