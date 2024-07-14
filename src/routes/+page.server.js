import User from '$lib/server/models/user.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const users = await User.getLeaderboard();
	return {
        users: users.map(user => user.get({ plain: true })),
	};
}