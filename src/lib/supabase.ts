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
  destination: number;
};

export type Duel = {
  id: number;
  created: string;
  updated: string;
  player_1: string;
  player_2: string;
  status: string;
};

export type Tournament = {
  id: number;
  created: string;
  updated: string;
  name: string;
  description: string;
  status: string;
  max_participants: number;
  num_winners: number;
};

export type Group = {
  id: number;
  created: string;
  updated: string;
  deleted: string;
  name: string;
}

export type Member = {
  id: number;
  created: string;
  updated: string;
  deleted: string;
  user: string;
  group: number;
}
