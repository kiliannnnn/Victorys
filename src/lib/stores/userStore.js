import { writable } from 'svelte/store';
import PocketBase from 'pocketbase';
import { goto } from '$app/navigation';
import { User } from 'lucide-svelte';

export const user = writable(null);

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

const authData = await pb.admins.authWithPassword(
    import.meta.env.VITE_PB_ADMIN_EMAIL,
    import.meta.env.VITE_PB_ADMIN_PASS,
);

export async function getAllUsers() {
    try {
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

export async function getLoggedUser(userId) {
    try {
        const record = await pb.collection('users').getOne(userId, {
            expand: 'relField1,relField2.subRelField',
        });

        return record;
    } catch (error) {
        console.error('Error fetching record:', error);
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


/*


// userStore.js
import { writable } from 'svelte/store';
import PocketBase from 'pocketbase';
import { goto } from '$app/navigation';

export const user = writable(null);

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

// Initialize the store with authentication data if available
async function init() {
    try {
        const isLoggedIn = pb.authStore.isValid;
        if (isLoggedIn) {
            const currentUser = pb.authStore.model;
            user.set(currentUser);
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
        return records;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

export async function getLoggedUser(userId) {
    try {
        const record = await pb.collection('users').getOne(userId);
        user.set(record);
        return record;
    } catch (error) {
        console.error('Error fetching logged user:', error);
        return null;
    }
}

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
        goto('/login');
        console.log('User registered successfully');
    } catch (error) {
        console.error('Error registering user:', error);
    }
}

export async function loginUser(email, password) {
    try {
        const authData = await pb.collection('users').authWithPassword(email, password);
        user.set(authData.record); // Store only the record, not the entire authData object
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
    
    */