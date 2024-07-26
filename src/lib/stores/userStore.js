import { writable } from 'svelte/store';
import PocketBase from 'pocketbase';

export const user = writable(null);

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

// ADD Verifications
export async function registerUser(username, email, password, passwordConfirm) {
    try {
        const authData = await pb.admins.authWithPassword(
            import.meta.env.VITE_PB_ADMIN_EMAIL,
            import.meta.env.VITE_PB_ADMIN_PASS,
        );

        const data = {
            "username": username,
            "email": email,
            "emailVisibility": true,
            "password": password,
            "passwordConfirm": passwordConfirm
        };

        const record = await pb.collection('users').create(data);
        await pb.collection('users').requestVerification(record.email);
    } catch (error) {
        console.log('Error creating record:', error);
    }
}

export async function loginUser(email, password) {
    try {
        const authData = await pb.collection('users').authWithPassword(
            email,
            password,
        );
        user.set(authData);
    } catch (error) {
        console.log('Error logging in:', error);
    }
}

export function logoutUser() {
    user.set(null);
}
