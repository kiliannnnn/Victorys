<script>
    import { onMount } from 'svelte';
    import { auth } from '$lib/firebaseConfig';
    import { writable } from 'svelte/store';
    import { onAuthStateChanged } from 'firebase/auth';
    import { browser } from '$app/environment';
    import Logout from "$lib/components/logout.svelte";
  
    export let user = null;
    const showDropdown = writable(false);
    const isDarkMode = writable(false);
  
    const toggleDropdown = () => {
        showDropdown.update(n => !n);
    };
  
    const closeDropdown = () => {
        showDropdown.set(false);
    };

    const toggleDarkMode = () => {
        isDarkMode.update(n => !n);
        if (browser) {
            document.documentElement.classList.toggle('dark', $isDarkMode);
            localStorage.setItem('theme', $isDarkMode ? 'dark' : 'light');
        }
    };
  
    if (browser) {
        onMount(() => {
            const storedTheme = localStorage.getItem('theme');
            if (storedTheme === 'dark') {
                document.documentElement.classList.add('dark');
                isDarkMode.set(true);
            } else {
                document.documentElement.classList.remove('dark');
                isDarkMode.set(false);
            }
        });
  
        onAuthStateChanged(auth, (firebaseUser) => {
            user = firebaseUser ? firebaseUser : null;
        });
  
        document.addEventListener('click', (event) => {
            const profileButton = document.getElementById('profileDropdown');
            const profileMenu = document.getElementById('profileDropdownMenu');
            if (profileButton && profileMenu && !profileButton.contains(event.target) && !profileMenu.contains(event.target)) {
                closeDropdown();
            }
        });
    }
</script>
  
<header class="flex items-center justify-between p-4 bg-zinc-200 dark:bg-zinc-800">
  <a href="/">
    <div class="flex items-center">
      <img src="https://placehold.co/50x50" alt="Logo" class="h-10 mr-2" />
      <h1 class="text-xl text-zinc-700 dark:text-white font-semibold">Victorys</h1>
    </div>
  </a>

  <nav class="flex space-x-4">
    <a href="#" class="p-2 rounded text-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700">Home</a>
    <a href="#" class="p-2 rounded text-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700">About</a>
    <a href="#" class="p-2 rounded text-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700">Services</a>

    <div class="relative inline-block">
      <button class="p-1 rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-600" id="themeToggler" on:click={toggleDarkMode}>
        🌓
      </button>
    </div>
  </nav>

  <div class="flex items-center relative">
    <!-- {#if user}
      <h1 class="p-2 rounded text-zinc-700 dark:text-white">Welcome, {user.username}</h1>
    {/if} -->
    <button class="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700" id="profileDropdown" on:click={toggleDropdown}>
      👤
    </button>
    {#if $showDropdown}
      <div class="origin-top-right absolute right-0 top-0 mt-12 w-40 rounded-md shadow-lg bg-white dark:bg-zinc-800 ring-1 ring-black ring-opacity-5 focus:outline-none" id="profileDropdownMenu">
        <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          {#if user}
            <a href="/profile" class="block px-4 py-2 text-sm text-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700" role="menuitem">Profile</a>
            <a href="/chatbox" class="block px-4 py-2 text-sm text-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700" role="menuitem">Chatbox</a>
            <a href="/settings" class="block px-4 py-2 text-sm text-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700" role="menuitem">Settings</a>
            <Logout />
          {:else}
            <a href="/login" class="block px-4 py-2 text-sm text-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700" role="menuitem">Login</a>
            <a href="/register" class="block px-4 py-2 text-sm text-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700" role="menuitem">Register</a>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</header>
