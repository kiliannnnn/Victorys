import { writable } from 'svelte/store';
import PocketBase from 'pocketbase';
import dotenv from 'dotenv';
dotenv.config();

export const user = writable(null);

const pb = new PocketBase(process.env.PB_URL);
const authData = await pb.admins.authWithPassword(
    process.env.PB_ADMIN_EMAIL,
    process.env.PB_ADMIN_PASS,
);

// ADD Verification
export async function registerUser(username, email, password, passwordConfirm) {
    try {
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

export async function loginUser(credentials) {
  authStatus.set({ isLoading: true, isLoggedIn: false, error: null });
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    if (!response.ok) {
      throw new Error('Login failed');
    }
    const userData = await response.json();
    user.set(userData);
    authStatus.set({ isLoading: false, isLoggedIn: true, error: null });
  } catch (error) {
    authStatus.set({ isLoading: false, isLoggedIn: false, error: error.message });
  }
}

export function logoutUser() {
  user.set(null);
  authStatus.set({ isLoading: false, isLoggedIn: false, error: null });
}
