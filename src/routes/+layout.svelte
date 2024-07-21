<script>
	import '$lib/app.css';
	
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
</script>

<Header />

<main class="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">
	<div class="container mx-auto p-4">
		<slot />
	</div>
</main>

<Footer />
