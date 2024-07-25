<script>
    import Icon from '@iconify/svelte';
</script>

<footer class="bg-background p-4">
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div class="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} Victorys. All rights reserved.</p>
        </div>
        <div class="flex flex-col md:flex-row items-center mt-4 md:mt-0">
            <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm md:mr-4">Privacy Policy</a>
            <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm md:mr-4">Terms of Service</a>
            <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">Cookie Policy</a>
        </div>
    </div>
</footer>
