<script context="module">
    export async function load({ params }) {
        const duelId = params.duelId;

        // Fetch duel information from the SQL database
        const response = await fetch(`/api/duel/${duelId}`);
        const duel = await response.json();

        if (response.ok) {
            return { props: { duel } };
        } else {
            return {
                status: response.status,
                error: new Error("Could not load duel"),
            };
        }
    }
</script>

<script>
    export let duel;
</script>

<div class="duel-container">
    <h1 class="duel-title">Duel Information</h1>
    <div class="duel-details">
        <p><strong>Player 1:</strong> {duel.player1_name}</p>
        <p><strong>Player 2:</strong> {duel.player2_name}</p>
        <p><strong>Status:</strong> {duel.status}</p>
    </div>
</div>

<style>
    .duel-container {
        padding: 1rem;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .duel-title {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    .duel-details p {
        font-size: 1.2rem;
        margin: 0.5rem 0;
    }
</style>
