import {
    createResource,
    For,
    ErrorBoundary,
    onMount,
    createEffect,
    createSignal,
    onCleanup,
} from 'solid-js'
import type { Component } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { supabase } from '@/lib/supabase'
import type { RealtimeChannel } from '@supabase/supabase-js'

type Message = {
    id: number
    created: string	
    updated: string
    deleted: string
    content: string
    sender: string
    target: string
}

const loadMessages = async () => {
    const { data, error } = await supabase.from<Message>('messages').select()
    console.log('load messages', data)
    if (error) {
        console.log(error)
        throw error
    }
    
    return data
}

const Chatbox: Component = () => {
    const [data, { mutate, refetch }] = createResource(loadMessages)
    const [messages, setMessages] = createStore<Message[]>([])
    const [inputMessage, setInputMessage] = createSignal<string>('')
    let messageChannel: RealtimeChannel
    
    createEffect(() => {
        const returnedValue = data()
        if (returnedValue) {
            setMessages(returnedValue)
        }
    })
    
    onMount(() => {
        const handleInserts = (payload: any) => {
            console.log('Change received!', payload)
        }
        
        messageChannel = supabase
        .channel('messages')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, handleInserts)
        .subscribe()
    })
    
    /*   onCleanup(() => {
    supabase.removeChannel(messageChannel);
    }) */
    
    async function submitted() {
        console.log(inputMessage())
        const { data, error } = await supabase.from<Message>('messages').insert({
            task: inputMessage(),
            is_complete: false,
        })
        if (error) {
            console.error(error)
        }
        setInputMessage('')
    }
    
    return (
        <div class="m-1">
            <input class="border-4" type="text" name="message" value={inputMessage()} onInput={(e) => setInputMessage(e.target.value)}/>
            <button onClick={submitted}>Submit</button>
            <ErrorBoundary
                fallback={
                    <div class="text-white bg-red-500">
                    Something went terribly wrong <br></br> {data.error.message}{' '}
                    </div>
                }>
                <For each={messages}>
                    {(message) => <div class="text-black p-4 my-2">{message.content}</div>}
                </For>
            </ErrorBoundary>
        </div>
    )
}

export default Chatbox