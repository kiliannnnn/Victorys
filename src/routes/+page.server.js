import User from '$lib/server/models/user.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const users = await User.getLeaderboard();
	return {
        users: users.map(user => user.get({ plain: true })),
	};
}

async function joinQueue() {
    const response = await fetch('/api/join-queue', {
        method: 'POST',
        body: JSON.stringify({ userId }),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    
    if (data.duelId) {
        // Redirect to duel page
        goto(`/duel/${data.duelId}`);
    }
}
