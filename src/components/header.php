<?php
require_once '..\src\database\DAO\User.php';
$userDao = new UserDAO();
?>
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
        <a href="#"
            class="p-2 rounded text-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700">Services</a>

        <div class="relative inline-block">
            <button class="p-1 rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-600"
                id="themeToggler" onclick="toggleDarkMode()">
                🌓
            </button>
        </div>
    </nav>

    <div class="flex items-center relative">
        <?php
        if (isset($_SESSION['user_id'])) {
            echo "<h1 class='p-2 rounded text-zinc-700 dark:text-white'>Welcome, " . $userDao->getUserById($_SESSION['user_id'])['username'] . "</h1>";
        }
        ?>
        <button class="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700"
            id="profileDropdown">
            👤
        </button>
        <div class="origin-top-right absolute right-0 top-0 mt-12 w-40 rounded-md shadow-lg bg-white dark:bg-zinc-800 ring-1 ring-black ring-opacity-5 focus:outline-none hidden"
            id="profileDropdownMenu">
            <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <?php
                if (isset($_SESSION['user_id'])) {
                    ?>
                    <a href="/profile"
                        class="block px-4 py-2 text-sm text-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
                        role="menuitem">Profile</a>
                    <a href="/chatbox"
                        class="block px-4 py-2 text-sm text-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
                        role="menuitem">Chatbox</a>
                    <a href="/settings"
                        class="block px-4 py-2 text-sm text-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
                        role="menuitem">Settings</a>
                    <a href="/logout"
                        class="block px-4 py-2 text-sm text-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
                        role="menuitem">Logout</a>
                    <?php
                } else {
                    ?>
                    <a href="/login"
                        class="block px-4 py-2 text-sm text-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
                        role="menuitem">Login</a>
                    <a href="/register"
                        class="block px-4 py-2 text-sm text-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
                        role="menuitem">Register</a>
                    <?php
                }
                ?>
            </div>
        </div>
    </div>
</header>

<script>
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    function toggleDarkMode() {
        document.documentElement.classList.toggle('dark');
        const isDarkMode = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
</script>

<script>
    const profileButton = document.getElementById('profileDropdown');
    const profileMenu = document.getElementById('profileDropdownMenu');

    profileButton.addEventListener('click', () => {
        profileMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (event) => {
        if (!profileButton.contains(event.target) && !profileMenu.contains(event.target)) {
            profileMenu.classList.add('hidden');
        }
    });
</script>