import { writable } from 'svelte/store';
import PocketBase from 'pocketbase';
import { goto } from '$app/navigation';

export const duel = writable(null);

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

// async function initAdminAuth() {
//     try {
//         await pb.admins.authWithPassword(
//             import.meta.env.VITE_PB_ADMIN_EMAIL,
//             import.meta.env.VITE_PB_ADMIN_PASS,
//         );
//     } catch (error) {
//         console.error('Error authenticating admin:', error);
//     }
// }

// initAdminAuth();

export async function createDuel(playerId) {
    if (!playerId) {
        console.error('Invalid player ID.');
        return;
    }
    try {
        const data = {
            players: [playerId],
            status: 'waiting',
        };
        const record = await pb.collection('duels').create(data);
        duel.set(record);
        goto(`/duel/${record.id}`);
    } catch (error) {
        console.error('Error creating duel:', error);
    }
}

export async function joinDuel(duelId, playerId) {
    if (!playerId) {
        console.error('Invalid player ID.');
        return;
    }
    try {
        const record = await pb.collection('duels').getOne(duelId);
        if (!record) {
            console.error('Duel not found.');
            return;
        }
        record.players.push(playerId);
        const updatedRecord = await pb.collection('duels').update(duelId, record);
        duel.set(updatedRecord);
        goto(`/duel/${duelId}`);
    } catch (error) {
        console.error('Error joining duel:', error);
    }
}

export async function leaveDuel(duelId, playerId) {
    if (!playerId) {
        console.error('Invalid player ID.');
        return;
    }
    try {
        const record = await pb.collection('duels').getOne(duelId);
        if (!record) {
            console.error('Duel not found.');
            return;
        }
        record.players = record.players.filter(player => player !== playerId);
        const updatedRecord = await pb.collection('duels').update(duelId, record);
        duel.set(updatedRecord);
        goto('/');
    } catch (error) {
        console.error('Error leaving duel:', error);
    }
}

export async function userInQueue(playerId) {
    if (!playerId) {
        console.error('Invalid player ID.');
        return false;
    }
    try {
        const record = await pb.collection('users').getOne(playerId, {
            expand: 'relField1,relField2.subRelField',
        });
        // Check if user is in queue
    } catch (error) {
        console.error('Error checking if user is in queue:', error);
        return false;
    }
}

export async function startDuel(duelId, playerId) {
    try {
        const record = await pb.collection('duels').getOne(duelId);
        record.status = 'playing';
        const updatedRecord = await pb.collection('duels').update(duelId, record);
        duel.set(updatedRecord);
        goto(`/duel/${duelId}`);
    } catch (error) {
        console.error('Error starting duel:', error);
    }
}

export async function endDuel(duelId, playerId) {
    try {
        const record = await pb.collection('duels').getOne(duelId);
        record.status = 'finished';
        const updatedRecord = await pb.collection('duels').update(duelId, record);
        duel.set(updatedRecord);
        goto('/');
    } catch (error) {
        console.error('Error ending duel:', error);
    }
}
