<script>
    import { auth } from "$lib/firebaseConfig";
    import { onAuthStateChanged } from "firebase/auth";
    import { writable } from "svelte/store";
    import { goto } from "$app/navigation";
    import { browser } from "$app/environment";
    import Header from "$lib/Header.svelte";
    import Footer from "$lib/Footer.svelte";
    import joinQueue from "$lib/joinQueue.svelte";
    import JoinQueue from "../lib/joinQueue.svelte";

    let user = writable(null);

    if (browser) {
        onAuthStateChanged(auth, (firebaseUser) => {
            user.set(firebaseUser);
            if (firebaseUser) {
                goto("/");
            } else {
                goto("/login");
            }
        });
    }
</script>

<Header {user} />

<main class="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">
    <div class="container mx-auto p-4">
        <slot />
    </div>
</main>

<Footer />

<style global>
    @import "../app.css";
</style>
