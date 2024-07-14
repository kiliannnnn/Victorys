<script>
    import { auth } from "$lib/firebaseConfig";
    import { signOut } from "firebase/auth";

    const logout = async () => {
        await signOut(auth);
    };
</script>

<button on:click={logout}>Logout</button>
