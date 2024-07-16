<script context="module">
  import db from '$lib/firebaseConfig';
  import { doc, getDoc, onSnapshot, collection, addDoc, serverTimestamp } from 'firebase/firestore';
  import { onMount } from 'svelte';

  export async function load({ params }) {
    const duelId = params.duelId;
    const duelRef = doc(db, 'duels', duelId);

    let duelData = {};
    const duelDoc = await getDoc(duelRef);

    if (duelDoc.exists()) {
      duelData = duelDoc.data();
    }

    return {
      props: {
        duelId,
        initialDuelData: duelData
      }
    };
  }
</script>

<script>
  export let duelId;
  export let initialDuelData;
  
  let duelData = initialDuelData;
  let messages = [];

  onMount(() => {
    const duelRef = doc(db, 'duels', duelId);
    onSnapshot(duelRef, (doc) => {
      duelData = doc.data();
    });

    const messagesRef = collection(db, 'duels', duelId, 'messages');
    onSnapshot(messagesRef, (snapshot) => {
      messages = snapshot.docs.map(doc => doc.data());
    });
  });

  let messageContent = '';

  async function sendMessage() {
    if (duelData.status === 'in progress') {
      await addDoc(collection(db, 'duels', duelId, 'messages'), {
        message: messageContent,
        sender: userId,
        timestamp: serverTimestamp()
      });
      messageContent = '';
    }
  }
</script>

<h1>Duel between {duelData.player1_id} and {duelData.player2_id}</h1>
<div>
  <p>Chat messages will appear here</p>
  {#each messages as message}
    <p>{message.sender}: {message.message}</p>
  {/each}
</div>

{#if duelData.status === 'in progress'}
  <form on:submit|preventDefault={sendMessage}>
    <input type="text" bind:value={messageContent} />
    <button type="submit">Send</button>
  </form>
{:else}
  <p>Waiting for the duel to start...</p>
{/if}
