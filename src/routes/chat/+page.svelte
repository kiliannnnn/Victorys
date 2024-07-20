<script>
	import { onMount } from 'svelte';

	let socket;
	let messages = [];
	let message = '';

	function connect() {
		socket = new WebSocket('ws://localhost:8080');
		socket.onmessage = (event) => {
			messages = [...messages, event.data];
		};
	}
	function sendMessage() {
		if (socket.readyState === WebSocket.OPEN) {
			socket.send(message);
			message = '';
		}
	}
	onMount(() => {
		if (typeof window !== 'undefined') {
			connect();
		}
	});
</script>

<div>
	<ul>
		{#each messages as msg}
			<li>{msg}</li>
		{/each}
	</ul>

	<input type="text" bind:value={message} placeholder="Type a message" />
	<button on:click={sendMessage}>Send</button>
</div>
