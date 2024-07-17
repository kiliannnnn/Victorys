import Duel from '$lib/server/models/duel';

export async function post({ request }) {
  const { player1_id, player2_id } = await request.json();

  try {
    const duel = await Duel.create({
      player1_id,
      player2_id,
      status: 'pending',
    });

    return {
      status: 201,
      body: { duel },
    };
  } catch (error) {
    console.error('Error creating duel:', error);
    return {
      status: 500,
      body: { error: 'Failed to create duel' },
    };
  }
}
