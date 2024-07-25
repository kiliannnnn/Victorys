<script>
	import '../app.css';
	
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
</script>

<Header />

<main class="bg-background container mx-auto p-4">
	<slot />
</main>

<Footer />
