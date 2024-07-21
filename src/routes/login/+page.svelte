<script>
	import { signIn } from '@auth/sveltekit';

	const providers = [
		{ name: 'Google', icon: 'google-icon.svg', id: 'google' },
		{ name: 'GitHub', icon: 'github-icon.svg', id: 'github' },
		{ name: 'Custom', icon: 'custom-icon.svg', id: 'custom' }
	];

	const redirectToProvider = (provider) => {
		if (provider === 'custom') {
			window.location.href = '/custom-auth';
		} else {
			signIn(provider);
		}
	};
</script>

<main class="flex flex-col items-center justify-center min-h-screen">
	<h1 class="text-2xl mb-4">Sign In</h1>
	<div class="flex flex-col space-y-2">
		{#each providers as provider}
			<button
				class="flex items-center p-2 border rounded hover:bg-gray-200" on:click={() => redirectToProvider(provider.id)}>
				<img src={provider.icon} alt={provider.name} class="h-6 w-6 mr-2" />
				<span>Sign in with {provider.name}</span>
			</button>
		{/each}
	</div>
</main>
