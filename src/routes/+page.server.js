import PocketBase from 'pocketbase';

let users = [];

async function getAllUsers() {
    const pb = new PocketBase(import.meta.env.PB_URL);

    pb.send = async function (path, options) {
        const url = `${this.baseUrl}${path}`;
        const response = await fetch(url, options);
        return response.json();
    };
    
    try {
        const authData = await pb.admins.authWithPassword(
            import.meta.env.VITE_PB_ADMIN_EMAIL,
            import.meta.env.VITE_PB_ADMIN_PASS,
        );

        const records = await pb.collection('users').getFullList({
            sort: '-token',
        });

        return records.map(element => ({
            username: element.username,
            token: element.token
        }));
    } catch (error) {
        console.error('Error fetching records:', error);
        return [];
    }
}

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const users = await getAllUsers();
	return { users };
}