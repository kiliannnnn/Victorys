<script context="module" lang="ts">
    export async function load({ params }) {
        const duelId = params.duelId;
        // Fetch duel info and messages from your database
        const duelData = await fetchDuelData(duelId);
        return { props: { duelData } };
    }

    async function sendAutomaticMessages(duelId) {
        // Logic to send automatic messages
        const messages = ["Welcome to the duel!", "Get ready to fight!"];

        for (const message of messages) {
            await saveMessage(duelId, message);
        }
    }

    // Assuming you have a flag in your duel model
    if (duelData.status === "active") {
        canSendMessages = true; // Set this based on your app logic
    }
</script>

<script>
    export let duelData;

    // You can implement a mechanism to periodically fetch new messages
</script>

<h1>Duel between {duelData.player1} and {duelData.player2}</h1>
<div>
    {#each duelData.messages as message}
        <p>{message}</p>
    {/each}
</div>
