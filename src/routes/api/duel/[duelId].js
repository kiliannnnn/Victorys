import { db as sqlDb } from '$lib/sqlDatabase'; // Adjust the path as needed to your SQL database instance
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
    const duelId = params.duelId;

    try {
        const duel = await sqlDb.duels.findByPk(duelId);

        if (duel) {
            return json(duel);
        } else {
            return json({ error: 'Duel not found' }, { status: 404 });
        }
    } catch (error) {
        return json({ error: 'Failed to fetch duel' }, { status: 500 });
    }
}
