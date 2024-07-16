<script>
    import { onMount } from 'svelte';
    import { auth } from "$lib/firebaseConfig";
    import { onAuthStateChanged } from "firebase/auth";
    import { goto } from "$app/navigation";
    import Header from "$lib/components/header.svelte";
    import Footer from "$lib/components/footer.svelte";

    let user = null;

    onMount(() => {
        onAuthStateChanged(auth, (currentUser) => {
            user = currentUser;
            if (currentUser) {
                goto("/");
            } else {
                goto("/login");
            }
        });
    });
</script>

<Header {user} />

<main class="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">
    <div class="container mx-auto p-4">
        <slot {user} />
    </div>
</main>

<Footer />

<style global>
    @import "../app.css";
</style>
