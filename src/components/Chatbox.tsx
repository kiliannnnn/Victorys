import { createSignal, createEffect, For, Show, onCleanup } from 'solid-js';
import { createStore } from 'solid-js/store';
import { supabase } from '@/lib/supabase';
import type { Message as SupabaseMessage } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/auth-js";

type ChatboxProps = {
  users: SupabaseUser[];
  senderUser: SupabaseUser;
};

export default function Chatbox({ users, senderUser }: ChatboxProps) {
  const [targetUser, setTargetUser] = createSignal<SupabaseUser | null>(null);
  const [messages, setMessages] = createStore<SupabaseMessage[]>([]);
  const [newMessage, setNewMessage] = createSignal('');
  let messagesEndRef: HTMLDivElement | undefined;

  createEffect(() => {
    if (targetUser()) {
      fetchMessages();
    }
  });

  createEffect(() => {
    if (!targetUser()) return;

    const subscription = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          const newMessage = payload.new as SupabaseMessage;
          if (
            (newMessage.sender === senderUser.id && newMessage.target === targetUser()?.id) ||
            (newMessage.sender === targetUser()?.id && newMessage.target === senderUser.id)
          ) {
            setMessages((prev) => [...prev, newMessage]);
          }
        }
      )
      .subscribe();

    onCleanup(() => {
      subscription.unsubscribe();
    });
  });

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(
        `and(sender.eq.${senderUser.id},target.eq.${targetUser()?.id}),and(sender.eq.${targetUser()?.id},target.eq.${senderUser.id})`
      )
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
    if (!message || !targetUser()) return;

    const { error } = await supabase
      .from('messages')
      .insert([{ content: message, sender: senderUser.id, target: targetUser()?.id }]);

    if (error) {
      console.error('Error sending message:', error);
    } else {
      setNewMessage('');
    }
  };

  return (
    <div class="bg-gray-100 dark:bg-gray-900 min-h-screen py-8">
      <div class="container mx-auto px-4 lg:px-8">
        <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg flex flex-col lg:flex-row overflow-hidden">
          <nav class="bg-gray-200 dark:bg-gray-700 w-full lg:w-1/5">
            <ul>
              <For each={users}>
                {(user) => (
                  <li>
                    <button
                      onclick={() => setTargetUser(user)}
                      class="block w-full text-left text-gray-900 dark:text-gray-100 font-semibold py-1 px-4 hover:bg-blue-100 dark:hover:bg-blue-900"
                    >
                      {user.email}
                    </button>
                  </li>
                )}
              </For>
            </ul>
          </nav>

          <div class="w-full lg:w-4/5 p-6 lg:p-8">
            <Show
              when={targetUser()}
              fallback={
                <div class="text-center text-gray-500">
                  Select a user to start chatting.
                </div>
              }
            >
              <div class="flex flex-col h-[500px]">
                <div class="flex-1 overflow-y-auto space-y-4">
                  <For each={messages}>
                    {(message) => (
                      <div
                        classList={{
                          'flex justify-end': message.sender === senderUser.id,
                          'flex justify-start': message.sender !== senderUser.id,
                        }}
                      >
                        <div
                          classList={{
                            'max-w-xs px-4 py-2 rounded-lg bg-blue-500 text-white':
                              message.sender === senderUser.id,
                            'max-w-xs px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-600':
                              message.sender !== senderUser.id,
                          }}
                        >
                          <p>{message.content}</p>
                        </div>
                      </div>
                    )}
                  </For>
                  <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSendMessage} class="mt-4">
                  <div class="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage()}
                      onInput={(e) => setNewMessage(e.currentTarget.value)}
                      placeholder="Type a message..."
                      class="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      class="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </Show>
          </div>
        </div>
      </div>
    </div>
  );
}
