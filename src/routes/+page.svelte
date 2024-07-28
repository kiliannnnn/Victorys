<script>    
    import { Button } from "$lib/components/ui/button"
    import {
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
    } from "$lib/components/ui/table"
    import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
    } from "$lib/components/ui/card"

    import { onMount } from "svelte";

    import { user, getAllUsers } from "$lib/stores/userStore";
    import { createDuel, joinDuel, leaveDuel, userInQueue } from "$lib/stores/duelStore";
    
    let users = [];
    let isWaiting = false;
    onMount(async () => {
        users = await getAllUsers();
        isWaiting = await userInQueue();
    });

    async function handleJoinDuel() {
        try {
            await joinDuel();
            isWaiting = true;
        } catch (error) {
            console.error(error);
        }
    }

    async function handleLeaveDuel() {
        try {
            await leaveDuel();
            isWaiting = false;
        } catch (error) {
            console.error(error);
        }
    }
</script>

<div class="bg-background grid gap-6">
    <Card>
        <CardHeader>
            <CardTitle>Tournament of Champions 2023</CardTitle>
            <CardDescription>Join our biggest tournament yet and compete for the top spot!</CardDescription>
        </CardHeader>
        <CardContent>
            <p>April 15, 2024</p>
        </CardContent>
        <CardFooter>
            {#if isWaiting}
                <Button color="red" on:click={handleLeaveDuel}>Leave Queue</Button>
            {:else}
                <Button color="blue" on:click={handleJoinDuel}>Join Queue</Button>
            {/if}
        </CardFooter>
    </Card>

    <Card>
        <CardHeader>
            <CardTitle>League of Legends</CardTitle>
            <CardDescription>Compete in the most popular MOBA.</CardDescription>
        </CardHeader>
        <CardContent>
        </CardContent>
        <CardFooter>
            <Button>More details</Button>
        </CardFooter>
    </Card>

    <div>
        <TableHead>Leaderboard</TableHead>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Token</TableCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                {#each users as user, index}
                    <TableRow>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.token}</TableCell>
                    </TableRow>
                {/each}
            </TableBody>
        </Table>
    </div>
</div>
