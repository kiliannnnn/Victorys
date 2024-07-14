<script>
    import { goto } from "$app/navigation";

    async function joinQueue() {
        const response = await fetch("/api/join-queue", {
            method: "POST",
            body: JSON.stringify({ userId }),
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();

        if (data.duelId) {
            // Redirect to duel page
            goto(`/duel/${data.duelId}`);
        }
    }
</script>

<button class="bg-blue-500 text-white p-2 rounded-lg mt-2" on:click={joinQueue}>Join Queue</button>
