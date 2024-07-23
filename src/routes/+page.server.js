import PocketBase from 'pocketbase';
import { onMount } from 'svelte';

let users = [];

async function getAllUsers() {
    const pb = new PocketBase('http://127.0.0.1:8090');

    try {
        const authData = await pb.admins.authWithPassword(
            'coudurier.kilian@gmail.com',
            'NaJBuu*42#',
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