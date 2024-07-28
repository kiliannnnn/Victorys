import { writable } from 'svelte/store';
import PocketBase from 'pocketbase';
import { goto } from '$app/navigation';

export const duel = writable(null);

const pb = new PocketBase(import.meta.env.VITE_PB_URL);

const authData = await pb.admins.authWithPassword(
    import.meta.env.VITE_PB_ADMIN_EMAIL,
    import.meta.env.VITE_PB_ADMIN_PASS,
);

const playerId = "y910zaz5p9txc4h";

export async function createDuel(playerId) {
    try {
        const data = {
            players: [userState.username],
            status: 'waiting',
        };

        const record = await pb.collection('duels').create(data);
        duel.set(record);
        goto('/duel/' + record.id);
    } catch (error) {
        console.error('Error creating duel:', error);
    }
}

export async function joinDuel(duelId, playerId) {
    try {
        const record = await pb.collection('duels').getFirstListItem('users ~ "'+ playerId +'"', {
            expand: 'relatedField1,relatedField2.subRelatedField',
        });
        
        record.players.push(userState.username);
        duel.set(record);
        await pb.collection('duels').update(duelId, record);
        goto('/duel/' + duelId);
    } catch (error) {
        console.error('Error joining duel:', error);
    }
}

export async function leaveDuel(duelId, playerId) {
    try {
        const record = await pb.collection('duels').getFirstListItem('users ~ "'+ playerId +'"', {
            expand: 'relatedField1,relatedField2.subRelatedField',
        });
        
        duel.set(record);
        await pb.collection('duels').update(duelId, record);
        goto('/');
    } catch (error) {
        console.error('Error leaving duel:', error);
    }
}

export async function userInQueue(playerId) {
    try {
        const record = await pb.collection('duels').getFirstListItem('users ~ "'+ playerId +'"', {
            expand: 'relatedField1,relatedField2.subRelatedField',
        });
        if (record) {
            duel.set(record);
            return true;
        }
    } catch (error) {
        console.error('Error checking if user is in queue:', error);
    }
}



export async function startDuel(duelId, playerId) {
    try {
        const record = await pb.collection('duels').getFirstListItem('users ~ "'+ playerId +'"', {
            expand: 'relatedField1,relatedField2.subRelatedField',
        });
        
        record.status = 'playing';
        duel.set(record);
        await pb.collection('duels').update(duelId, record);
        goto('/duel/' + duelId);
    } catch (error) {
        console.error('Error starting duel:', error);
    }
}

export async function endDuel(duelId, playerId) {
    try {
        const record = await pb.collection('duels').getFirstListItem('users ~ "'+ playerId +'"', {
            expand: 'relatedField1,relatedField2.subRelatedField',
        });
        
        record.status = 'finished';
        duel.set(record);
        await pb.collection('duels').update(duelId, record);
        goto('/');
    } catch (error) {
        console.error('Error ending duel:', error);
    }
}
