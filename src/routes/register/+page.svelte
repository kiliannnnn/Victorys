<script>
    import { Button } from "$lib/components/ui/button";
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";

    import { user, registerUser, logoutUser } from "$lib/stores/userStore";
    let username = "";
    let email = "";
    let password = "";

    let userState = null;
	user.subscribe(value => {
	  userState = value;
	});
    
    async function handleLogout() {
        try {
            await logoutUser();
        } catch (error) {
            console.error(error);
        }
    }
</script>

{#if !userState || userState == false}
    <Card class="mx-auto max-w-sm">
        <CardHeader>
            <CardTitle class="text-xl">Sign Up</CardTitle>
            <CardDescription>
                Enter your information to create an account
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div class="grid gap-4">
                <div class="grid gap-2">
                    <Label htmlFor="first-name">Username</Label>
                    <Input id="first-name" placeholder="Max" bind:value={username} required />
                </div>
                <div class="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="max@example.com" bind:value={email} required/>
                </div>
                <div class="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" bind:value={password} required/>
                </div>
                <Button type="submit" class="w-full" on:click={registerUser(username, email, password, password)}>Create an account</Button>
                <Button variant="outline" class="w-full">Sign up with GitHub</Button>
            </div>
            <div class="mt-4 text-center text-sm">
                Already have an account?{" "}
                <a href="/login" class="underline">Sign in</a>
            </div>
        </CardContent>
    </Card>
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
