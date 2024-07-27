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

    import { user } from "$lib/stores/userStore";

    export let data;
	/**
	 * @type {boolean}
	 */
	let userInQueue = false;

	/**
	 * @type {any[]}
	 */
	let queue = [];

	function leaveQueue() {
		// queue = queue.filter(person => person.name !== user.username);
		userInQueue = false;
	}

	function joinQueue() {
		// queue = [...queue, { name: user.username }];
		userInQueue = true;
	}

    let userState;
	user.subscribe(value => {
	  userState = value;
	});
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
            {#if userInQueue}
                <Button color="red" on:click={leaveQueue}>Leave Queue</Button>
            {:else}
                <Button color="blue" on:click={joinQueue}>Join Queue</Button>
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
                {#each data.users as user, index}
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
