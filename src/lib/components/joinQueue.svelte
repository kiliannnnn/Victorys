<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { auth } from "$lib/firebaseConfig";
    import { onAuthStateChanged } from "firebase/auth";

    export let user = null;

    onMount(() => {
        if (!user) {
            onAuthStateChanged(auth, (currentUser) => {
                if (currentUser) {
                    user = currentUser.uid;
                } else {
                    console.error("User not authenticated");
                }
            });
        }
    });

    async function joinQueue() {
        if (!user) {
            console.error("User ID not available");
            return;
        }

        const response = await fetch("/api/join-queue", {
            method: "POST",
            body: JSON.stringify({ user }),
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (data.duelId) {
            goto(`/duel/${data.duelId}`);
        } else {
            console.error("Failed to join the queue");
        }
    }
</script>

<button class="bg-blue-500 text-white p-2 rounded-lg mt-2" on:click={joinQueue}>Join Queue</button>
