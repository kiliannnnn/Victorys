import { writable } from 'svelte/store';
import PocketBase from 'pocketbase';
import { goto } from '$app/navigation';
// import { User } from 'lucide-svelte';
import { userMapping } from '$lib/stores/userMappingStore';

export const user = writable(null);

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

async function init() {
    try {
        const isLoggedIn = pb.authStore.isValid;
        if (isLoggedIn) {
            const currentUser = pb.authStore.model;
            user.set(currentUser);
            userMapping.update(map => map.set(currentUser.id, currentUser.pocketbaseId));
        }
    } catch (error) {
        console.error('Error initializing user store:', error);
    }
}

init();

export async function getAllUsers() {
    try {
        const records = await pb.collection('users').getFullList({
            sort: '-token',
        });
        return records
    } catch (error) {
        console.error('Error fetching records:', error);
        return [];
    }
}

export async function getLoggedUser(userId) {
    try {
        const pocketbaseId = getPocketbaseId(userId);
        if (!pocketbaseId) {
            throw new Error('PocketBase ID not found for user');
        }
        const record = await pb.collection('users').getOne(pocketbaseId);
        user.set(record);
        return record;
    } catch (error) {
        console.error('Error fetching logged user:', error);
        return null;
    }
}

// ADD VERIFICATIONS
export async function registerUser(username, email, password, passwordConfirm) {
    try {
        const data = {
            username,
            email,
            emailVisibility: true,
            password,
            passwordConfirm,
        };

        const record = await pb.collection('users').create(data);
        await pb.collection('users').requestVerification(record.email);
        userMapping.update(map => map.set(record.id, record.pocketbaseId));
        goto('/login');
        console.log('User registered successfully');
    } catch (error) {
        console.error('Error creating record:', error);
    }
}

export async function loginUser(email, password) {
    try {
        const authData = await pb.collection('users').authWithPassword(email, password);
        user.set(authData.record);
        userMapping.update(map => map.set(authData.record.id, authData.record.pocketbaseId));
        console.log('User logged in successfully');
        goto('/');
    } catch (error) {
        console.error('Error logging in:', error);
    }
}

export function logoutUser() {
    user.set(null);
    pb.authStore.clear();
    console.log('User logged out successfully');
    goto('/login');
}

function getPocketbaseId(userId) {
    let pocketbaseId;
    userMapping.subscribe(map => {
        pocketbaseId = map.get(userId);
    })();
    return pocketbaseId;
}
