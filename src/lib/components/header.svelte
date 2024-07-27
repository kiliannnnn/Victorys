<script>
	import Icon from '@iconify/svelte';
	import { Button } from "$lib/components/ui/button";
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator,
		DropdownMenuTrigger,
	} from "$lib/components/ui/dropdown-menu";
	import { Input } from "$lib/components/ui/input";
	import { Sheet, SheetContent, SheetTrigger } from "$lib/components/ui/sheet";

	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { browser } from "$app/environment";
	
	import { user, logoutUser } from "$lib/stores/userStore";

	const showDropdown = writable(false);
	const isDarkMode = writable(false);

	const toggleDarkMode = () => {
		isDarkMode.update((n) => !n);
		if (browser) {
			document.documentElement.classList.toggle("dark", $isDarkMode);
			localStorage.setItem("theme", $isDarkMode ? "dark" : "light");
		}
	};

	if (browser) {
		onMount(() => {
			const storedTheme = localStorage.getItem("theme");
			if (storedTheme === "dark") {
				document.documentElement.classList.add("dark");
				isDarkMode.set(true);
			} else {
				document.documentElement.classList.remove("dark");
				isDarkMode.set(false);
			}
		});
	}

	let userState;
	user.subscribe(value => {
	  userState = value;
	});

	const handleLogout = async () => {
		try {
			await logoutUser();
		} catch (error) {
			console.error(error);
		}
	};
</script>

<header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
	<nav class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
		<a href="/" class="flex items-center gap-2 text-lg font-semibold md:text-base">
			<Icon icon="simple-icons:victoriametrics" class="h-6 w-6" />
			<span class="sr-only">Victorys</span>
		</a>
		<a href="/about" class="text-muted-foreground transition-colors hover:text-foreground">
			About
		</a>
		<a href="/tournaments" class="text-foreground transition-colors hover:text-foreground">
			Tournaments
		</a>
	</nav>
	<Sheet>
		<SheetTrigger>
			<Button variant="outline" size="icon" class="shrink-0 md:hidden">
				<Icon icon="mdi:menu" class="h-5 w-5" />
				<span class="sr-only">Toggle navigation menu</span>
			</Button>
		</SheetTrigger>
		<SheetContent side="left">
			<nav class="grid gap-6 text-lg font-medium">
				<a href="/" class="flex items-center gap-2 text-lg font-semibold">
					<Icon icon="simple-icons:victoriametrics" class="h-6 w-6" />
					<span class="sr-only">Victorys</span>
				</a>
				<a href="/about" class="text-muted-foreground hover:text-foreground">
					About
				</a>
				<a href="/tournaments" class="hover:text-foreground">
					Tournaments
				</a>
			</nav>
		</SheetContent>
	</Sheet>
	<div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 justify-end">
		<button class="p-1 rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-600" id="themeToggler" on:click={toggleDarkMode}>
			<Icon icon="ph:sun" class="h-5 w-5" />
		</button>
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button variant="secondary" size="icon" class="rounded-full">
					<Icon icon="mdi:account-circle-outline" class="h-5 w-5" />
					<span class="sr-only">Toggle user menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{#if !userState || userState == false}
					<DropdownMenuItem href="/login">Login</DropdownMenuItem>
					<DropdownMenuItem href="/register">Register</DropdownMenuItem>
				{:else}
					<DropdownMenuItem href="/account">Account</DropdownMenuItem>
					<DropdownMenuItem href="/settings">Settings</DropdownMenuItem>
					<DropdownMenuItem on:click={handleLogout}>Logout</DropdownMenuItem>
				{/if}
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
</header>
