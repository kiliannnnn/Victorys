<script>
    import { onMount } from "svelte";
    import { db, auth } from "$lib/firebaseConfig";
    import { onAuthStateChanged } from "firebase/auth";
    import { userStore } from "$lib/stores";
    import { get } from "svelte/store";
    import {
        collection,
        addDoc,
        deleteDoc,
        doc,
        onSnapshot,
        query,
        where,
    } from "firebase/firestore";
    import { goto } from "$app/navigation";

    export let data;
    export let user = null;
    let queue = [];
    let userInQueue = false;
    const queueRef = collection(db, "queue");
    userStore.subscribe((value) => (user = value));

    onMount(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                userStore.set(currentUser);
                checkUserInQueue(currentUser);
            } else {
                console.error("User not authenticated");
            }
        });

        onSnapshot(queueRef, (snapshot) => {
            queue = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            if (user) {
                checkUserInQueue(user);
                if (queue.length >= 2) {
                    if (queue[0].uid === user.uid) {
                        createDuel();
                    }
                }
            }
        });
    });

    function checkUserInQueue(currentUser) {
        userInQueue = queue.some((person) => person.uid === currentUser.uid);
    }

    async function joinQueue() {
        const currentUser = get(userStore);

        if (currentUser) {
            const userInQueue = queue.find(
                (person) => person.uid === currentUser.uid,
            );
            if (!userInQueue) {
                await addDoc(queueRef, {
                    name: currentUser.displayName || currentUser.uid,
                    uid: currentUser.uid,
                });
                checkUserInQueue(currentUser);
            }
        } else {
            alert("You must be logged in to join the queue.");
        }
    }

    async function leaveQueue() {
        const currentUser = get(userStore);

        if (currentUser) {
            const userDoc = queue.find(
                (person) => person.uid === currentUser.uid,
            );
            if (userDoc) {
                await deleteDoc(doc(db, "queue", userDoc.id));
                checkUserInQueue(currentUser);
            }
        }
    }

    async function createDuel() {
        const currentUser = get(userStore);
        const player1 = queue[0];
        const player2 = queue[1];

        await deleteDoc(doc(db, "queue", player1.id));
        await deleteDoc(doc(db, "queue", player2.id));

        if (currentUser.uid == player1.uid) {
            try {
                const response = await fetch("/api/duel", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        player1_id: player1.uid,
                        player2_id: player2.uid,
                    }),
                });
                const result = await response.json();
                if (result.duelId) {
                    goto(`/duel/${result.duelId}`);
                } else {
                    console.error('Error creating duel:', result.error);
                }
            } catch (error) {
                console.error('Error creating duel:', error);
            }
        } else {
            console.error("You are not the first player in the queue.");
        }
    }
</script>

<div class="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">
    <div class="container mx-auto px-4 py-8">
        <div class="bg-zinc-100 dark:bg-zinc-700 p-6 rounded-lg shadow">
            <h3 class="text-xl font-bold">Tournament of Champions 2023</h3>
            <p class="mb-4">Join our biggest tournament yet and compete for the top spot!</p>
            <div class="flex justify-between items-center mb-4">
                <div>
                    <p class="font-semibold">Date:</p>
                    <p class="text-zinc-600 dark:text-zinc-400">April 15, 2023</p>
                </div>
                <div>
                    <p class="font-semibold">Game:</p>
                    <p class="text-zinc-600 dark:text-zinc-400">League of Legends</p>
                </div>
            </div>
            <div class="flex justify-between items-center mb-4">
                <button class="bg-blue-500 text-white p-2 rounded-lg mr-2">Register Now</button>
                <a href="#view-more" class="text-blue-500 hover:underline">View More Details</a>
            </div>
        </div>
    </div>

    <div class="container mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-zinc-100 dark:bg-zinc-700 p-6 rounded-lg shadow flex items-center space-x-4">
            <img class="w-16 h-16" src="https://placehold.co/160" alt="Game 1"/>
            <div>
                <h3 class="text-xl font-bold">League of Legends</h3>
                <p class="text-zinc-600 dark:text-zinc-400">Compete in the most popular MOBA.</p>
                {#if userInQueue}
                    <button class="bg-red-500 text-white p-2 rounded-lg mt-2" on:click={leaveQueue}>Leave Queue</button>
                {:else}
                    <button class="bg-blue-500 text-white p-2 rounded-lg mt-2" on:click={joinQueue}>Join Queue</button>
                {/if}
                <div>
                    <ul>
                        {#each queue as person}
                            <li class="queue-item">{person.name}</li>
                        {/each}
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <h2 class="text-2xl font-semibold mb-4 text-center">Leaderboard</h2>
    <div class="overflow-x-auto relative">
        <table class="w-full text-sm text-left dark:text-zinc-200">
            <thead class="bg-zinc-100 dark:bg-zinc-700">
                <tr>
                    <th scope="col" class="px-6 py-3">Rank</th>
                    <th scope="col" class="px-6 py-3">Player</th>
                    <th scope="col" class="px-6 py-3">Tokens</th>
                </tr>
            </thead>
            <tbody>
                {#each data.users || [] as user, index}
                    <tr class="bg-white dark:bg-zinc-800 border-b border-zinc-100 dark:border-zinc-700">
                        <td class="px-6 py-4 font-medium whitespace-nowrap">{index + 1}</td>
                        <td class="px-6 py-4">{user.username}</td>
                        <td class="px-6 py-4">{user.token}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
