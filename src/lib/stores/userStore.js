import { writable } from 'svelte/store';
import PocketBase from 'pocketbase';
import { redirect } from '@sveltejs/kit';
import { goto } from '$app/navigation';

export const user = writable(null);

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

// ADD VERIFICATIONS
export async function registerUser(username, email, password, passwordConfirm) {
    try {
        await pb.admins.authWithPassword(
            import.meta.env.VITE_PB_ADMIN_EMAIL,
            import.meta.env.VITE_PB_ADMIN_PASS,
        );

        const data = {
            username,
            email,
            emailVisibility: true,
            password,
            passwordConfirm,
        };

        const record = await pb.collection('users').create(data);
        await pb.collection('users').requestVerification(record.email);
        goto('/login');
        console.log('User registered successfully');
    } catch (error) {
        console.error('Error creating record:', error);
    }
}

export async function loginUser(email, password) {
    try {
        const authData = await pb.collection('users').authWithPassword(email, password);
        user.set(authData);
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
}

export async function joinQueue() {
    if (!pb.authStore.authenticated) {
        redirect('/login');
    }
    else {
        try {
            user.set(await pb.authStore.getAuthData());
            await pb.collection('queue').create(data);
            console.log('User joined queue successfully');
        } catch (error) {
            console.error('Error joining queue:', error);
        }
    }
}