<div class="w-full bg-zinc-200 text-zinc-900 p-6 dark:bg-zinc-800 dark:text-zinc-300">
    <div class="flex flex-col items-center mb-6">
        <img class="h-12" src="https://placehold.co/40x40.png" alt="Company Logo" />
        <p class="text-xl font-semibold mt-2">Footer Title</p>
    </div>

    <div class="w-full flex flex-wrap justify-center items-center">
        <div class="md:w-1/3 px-2 mb-4 flex flex-col items-center">
            <h5 class="font-semibold text-sm uppercase tracking-wide">Company</h5>
            <ul class="mt-2 space-y-1">
                <li><a href="#" class="hover:text-zinc-500 transition duration-300">About Us</a></li>
                <li><a href="#" class="hover:text-zinc-500 transition duration-300">Our Team</a></li>
                <li><a href="#" class="hover:text-zinc-500 transition duration-300">Careers</a></li>
                <li><a href="#" class="hover:text-zinc-500 transition duration-300">Contact Us</a></li>
            </ul>
        </div>

        <div class="md:w-1/3 px-2 mb-4 flex flex-col items-center">
            <h5 class="font-semibold text-sm uppercase tracking-wide">Products</h5>
            <ul class="mt-2 space-y-1">
                <li><a href="#" class="hover:text-zinc-500 transition duration-300">Product A</a></li>
                <li><a href="#" class="hover:text-zinc-500 transition duration-300">Product B</a></li>
                <li><a href="#" class="hover:text-zinc-500 transition duration-300">Product C</a></li>
            </ul>
        </div>

        <div class="md:w-1/3 px-2 mb-4 flex flex-col items-center">
            <h5 class="font-semibold text-sm uppercase tracking-wide">Legal</h5>
            <ul class="mt-2 space-y-1">
                <li><a href="#" class="hover:text-zinc-500 transition duration-300">Terms of Service</a></li>
                <li><a href="#" class="hover:text-zinc-500 transition duration-300">Privacy Policy</a></li>
                <li><a href="#" class="hover:text-zinc-500 transition duration-300">Cookie Policy</a></li>
            </ul>
        </div>
    </div>

    <div class="w-full mt-8 border-t dark:border-zinc-600">
        <p class="text-center text-sm pt-4 pb-2">&copy; 2024 Victorys. All rights reserved.</p>
    </div>
</div>

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