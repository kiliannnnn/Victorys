import { json } from '@sveltejs/kit';
import Duel from '$lib/server/models/duel';
import sequelize from '$lib/server/sequelize';
import { adminDb } from '$lib/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST({ request }) {
    try {
        const { player1_id, player2_id } = await request.json();

        if (!player1_id || !player2_id) {
            return json({ success: false, message: 'Missing player IDs' }, { status: 400 });
        }

        await sequelize.authenticate();

        const duel = await Duel.create({
            tournament_id: 1, // hardcoded
            player1_id,
            player2_id,
            status: 'pending',
        });

        const duelRef = adminDb.collection('duels').doc();
        await duelRef.set({
            duel_id: duel.id,
            player1: player1_id,
            player2: player2_id,
            status: duel.status,
            createdAt: FieldValue.serverTimestamp(),
        });

        return json({ success: true, message: 'Duel created', duel });
    } catch (error) {
        console.error('Error creating duel:', error);
        return json({ success: false, message: 'Internal Error', error: error.message }, { status: 500 });
    }
}
