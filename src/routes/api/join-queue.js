import { json } from '@sveltejs/kit';
import Duel from '$lib/server/models/duel.js';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import db from '$lib/firebaseConfig.';

const waitingQueue = [];

export async function POST({ request }) {
  const { userId } = await request.json();
  waitingQueue.push(userId);

  if (waitingQueue.length >= 2) {
    const player1 = waitingQueue.shift();
    const player2 = waitingQueue.shift();
    
    const duel = await Duel.create({
      player1_id: player1,
      player2_id: player2,
      status: 'in progress'
    });

    await setDoc(doc(db, 'duels', duel.id.toString()), {
      player1_id: player1,
      player2_id: player2,
      status: 'in progress'
    });
    return json({ duelId: duel.id });
  }

  return json({ message: 'Added to queue' });
}
