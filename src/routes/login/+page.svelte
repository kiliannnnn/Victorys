<script>
    import { Button } from "$lib/components/ui/button";
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";

    import { user, loginUser, logoutUser } from "$lib/stores/userStore";
    let email = "";
    let password = "";

    let userState = null;
	user.subscribe(value => {
	  userState = value;
	});

    async function handleLogin() {
        try {
            await loginUser(email, password);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleLogout() {
        try {
            await logoutUser();
        } catch (error) {
            console.error(error);
        }
    }
</script>

<Card class="mx-auto max-w-sm">
    {#if !userState || userState == false}
        <CardHeader>
            <CardTitle class="text-2xl">Login</CardTitle>
            <CardDescription>
                Enter your email below to login to your account
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div class="grid gap-4">
                <div class="grid gap-2">
                    <Label for="email">Email</Label>
                    <Input id="email" type="email" placeholder="name@example.com" bind:value={email} required/>
                </div>
                <div class="grid gap-2">
                    <div class="flex items-center">
                        <Label for="password">Password</Label>
                        <a href="#" class="ml-auto inline-block text-sm underline"> Forgot your password?</a>
                    </div>
                    <Input id="password" type="password" bind:value={password} required />
                </div>
                <Button type="submit" class="w-full" on:click={handleLogin}>Login</Button>
                <Button variant="outline" class="w-full">Login with Google</Button>
            </div>
            <div class="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <a href="/register" class="underline">Sign up</a>
            </div>
        </CardContent>
    {:else}
        <CardHeader>
            <CardTitle class="text-2xl">Welcome back!</CardTitle>
            <CardDescription>
                You are already logged in
            </CardDescription>
        </CardHeader>
        <CardFooter>
            <Button color="red" on:click={handleLogout}>Logout</Button>
        </CardFooter>
    {/if}
</Card>
