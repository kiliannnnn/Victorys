<script>
    import { auth } from "$lib/firebaseConfig";
    import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
    import { writable } from "svelte/store";

    let email = "";
    let password = "";
    let error = writable("");

    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            error.set(err.message);
        }
    };
</script>

<h2 class="text-2xl font-bold mb-4">Login</h2>
<input type="email" bind:value={email} placeholder="Email" class="border rounded p-2 mb-2 dark:text-black" />
<input type="password" bind:value={password} placeholder="Password" class="border rounded p-2 mb-4 dark:text-black" />
<button on:click={login} class="bg-blue-500 text-white rounded p-2">Login</button>
{#if $error}
  <p class="text-red-500">{ $error }</p>
{/if}