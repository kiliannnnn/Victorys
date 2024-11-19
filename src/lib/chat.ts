
import { supabase } from "@/lib/supabase";

type User = {
    data: {
        user: {
            id: String,
        }
    }
}

export async function getDiscussion(user1: User, user2: User) {
    var { data } = await supabase
    .from('messages')
    .select()
    .eq('sender', user1.data.user?.id)
    .eq('target', user2.data.user?.id)
    const fromCurrentUser = data;
    var { data } = await supabase
    .from('messages')
    .select()
    .eq('sender', user2.data.user?.id)
    .eq('target', user1.data.user?.id)
    const toCurrentUser = data;
    
    const messages = fromCurrentUser?.concat(toCurrentUser);
    messages?.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());
}