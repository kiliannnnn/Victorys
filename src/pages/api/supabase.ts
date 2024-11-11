import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!supabaseKey || !supabaseUrl) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_KEY environment variables");
}
export const supabase = createClient(supabaseUrl, supabaseKey);
console.log(supabase);

const { data, error } = await supabase
    .from('User')
    .select()
console.log(data, error);