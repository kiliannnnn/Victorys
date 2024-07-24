<script>
    import { registerUser } from '$lib/stores/userStore';

    let username = '';
    let email = '';
    let password = '';
</script>
<div>
    <label for="username">Username</label>
    <input type="text" name="username" id="username" bind:value={username} required>
    <label for="email">Email</label>
    <input type="email" name="email" id="email" bind:value={email} required>
    <label for="password">Password</label>
    <input type="password" name="password" id="password" bind:value={password} required>
</div>
<button on:click={registerUser(username, email, password, password)}>Submit</button>