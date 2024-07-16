<script>
    import { auth } from "$lib/firebaseConfig";
    import { signOut } from "firebase/auth";

    const logout = async () => {
        await signOut(auth);
    };
</script>

<button
    class="block px-4 py-2 text-sm text-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
    role="menuitem"
    on:click={logout}>Logout
</button>
