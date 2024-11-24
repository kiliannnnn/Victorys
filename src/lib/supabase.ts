import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('SUPABASE_URL must be set');
}
if (!supabaseAnonKey) {
  throw new Error('SUPABASE_ANON_KEY must be set');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabaseAdmin =
  typeof window === 'undefined'
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export type User = {
  id: string;
  email: string;
};

export type Message = {
  id: number;
  created: string;
  updated: string;
  deleted: string;
  content: string;
  sender: string;
  target: string;
};


/* async function getDiscussion(user1: SupabaseUser, user2: SupabaseUser) {
  const { data: fromCurrentUser } = await supabase
      .from('messages')
      .select()
      // .eq('sender', user1.id)
      .eq('target', user2.id);

  const { data: toCurrentUser } = await supabase
      .from('messages')
      .select()
      .eq('sender', user2.id);
      // .eq('target', user1.id);

  const messages = [...(fromCurrentUser || []), ...(toCurrentUser || [])];
  messages.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());
  return messages;
} */