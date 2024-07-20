import { json } from '@sveltejs/kit';
import Duel from '$lib/server/models/duel.js';
import { doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase-admin/auth';
import db from '$lib/firebaseConfig.js';

const waitingQueue = [];

export async function POST({ request }) {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return json({ error: 'Missing or invalid authorization header' }, { status: 401 });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    const userId = decodedToken.uid;

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

    return json({ message: 'Added to queue'});

  } catch (error) {
    console.error('Error verifying ID token:', error);
    return json({ error: 'Unauthorized' }, { status: 401 });
  }
}
