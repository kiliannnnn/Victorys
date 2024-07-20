<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { writable } from 'svelte/store';

    const user = writable(null);

    function handleLogin(event) {
        user.set(event.detail.user);
    }

    function handleLogout() {
        user.set(null);
    }
</script>

<Header on:login={handleLogin} on:logout={handleLogout} />

<main class="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">
    <div class="container mx-auto p-4">
        <slot />
    </div>
</main>

<Footer />

<style global>
	@import '../app.css';
</style>