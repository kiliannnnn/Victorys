import { createSignal, createEffect, For, Show, onCleanup } from 'solid-js';
import { createStore } from 'solid-js/store';
import { supabase } from '@/lib/supabase';
import type { Message as SupabaseMessage, Group as SupabaseGroup } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/auth-js";

type ChatboxProps = {
  currentUser: SupabaseUser;
};

export default function Chatbox({ currentUser }: ChatboxProps) {
  const [groupList, setGroupList] = createSignal<SupabaseGroup[] | null>();
  const [targetGroup, setTargetGroup] = createSignal<SupabaseGroup | null>();
  const [messages, setMessages] = createStore<SupabaseMessage[]>([]);
  const [newMessage, setNewMessage] = createSignal('');

  createEffect(() => {    
    fetchGroups();
    if (targetGroup()) {
      fetchMessages();
    };
  });

  createEffect(() => {
    if (!targetGroup()) return;
  
    let subscription = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          const newMessage = payload.new as SupabaseMessage;
          if (newMessage.destination === targetGroup()?.id) {
            setMessages((prev) => [...prev, newMessage]);
          }
        }
      )
      .subscribe();
  
    onCleanup(() => {
      subscription.unsubscribe();
    });
  });

  const fetchGroups = async () => {
    const { data: groups, error } = await supabase
      .from('members')
      .select('group')
      .eq('user', currentUser.id);
      
    let groupsId: number[] = [];
    groups?.forEach(group => {
      groupsId.push(group.group);
    });
    
    if (error) {
      console.error('Error fetching messages:', error);
    } else {
      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .in('id', groupsId);

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setGroupList(data);
      }
    }
  };

  const fetchMessages = async () => {    
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('destination', targetGroup()?.id)
      .order('created', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
    } else {
      setMessages(data || []);
    }
  };

  const handleSendMessage = async (e: Event) => {
    e.preventDefault();
    const message = newMessage().trim();
    if (!message || !targetGroup()) return;

    const { error } = await supabase
      .from('messages')
      .insert([{ content: message, sender: currentUser.id, destination: targetGroup()?.id }]);

    if (error) {
      console.error('Error sending message:', error);
    } else {
      setNewMessage('');
    }
  };

  return (
    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg flex flex-col overflow-hidden h-auto w-full max-w-lg sm:max-w-[50vw] lg:max-w-[40vw]">
        <Show when={targetGroup()}>
          <header class="bg-gray-200 dark:bg-gray-700 p-2 flex items-center space-x-4">
            <button
              onclick={() => setTargetGroup(null)}
              class="p-2 rounded-full bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              <svg class="w-6 h-6 text-gray-900 dark:text-gray-100" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M14.707 4.293a1 1 0 010 1.414L10.414 10l4.293 4.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">{targetGroup()?.name}</h2>
          </header>
        </Show>

      <div class="flex-1 overflow-hidden">
        <Show when={targetGroup()} fallback={
          <nav class="bg-gray-200 dark:bg-gray-700 w-full h-full overflow-y-auto">
            <ul>
              <For each={groupList()}>
                {(group) => (
                  <li>
                    <button
                      onclick={() => setTargetGroup(group)}
                      class="block w-full text-left text-gray-900 dark:text-gray-100 font-semibold py-3 px-4 hover:bg-blue-200 dark:hover:bg-blue-800"
                    >
                      {group.name}
                    </button>
                  </li>
                )}
              </For>
            </ul>
          </nav>
        }>
          <div class="flex flex-col h-full">
            <div class="flex-1 overflow-y-auto space-y-4 p-4">
              <For each={messages}>
                {(message) => (
                  <div
                    classList={{
                      "flex justify-end": message.sender === currentUser.id,
                      "flex justify-start": message.sender !== currentUser.id,
                    }}
                  >
                    <div
                      classList={{
                        "max-w-xs px-4 py-2 rounded-lg bg-blue-500 text-white":
                          message.sender === currentUser.id,
                        "max-w-xs px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600":
                          message.sender !== currentUser.id,
                      }}
                    >
                      <p>{message.content}</p>
                    </div>
                  </div>
                )}
              </For>
            </div>
            <form onSubmit={handleSendMessage} class="p-4">
              <div class="flex space-x-2">
                <button 
                  id="btn-options"
                  class="px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >+</button>
                <input
                  type="text"
                  value={newMessage()}
                  onInput={(e) => setNewMessage(e.currentTarget.value)}
                  placeholder="Type a message..."
                  class="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  class="px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >Send</button>
              </div>
            </form>
          </div>
        </Show>
      </div>
    </div>
  );
}
