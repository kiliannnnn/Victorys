import { registerUser } from '$lib/auth';

export async function POST({ request }) {
    const { username, email, country, password } = await request.json();
    try {
        const user = await registerUser(username, email, country, password);
        return {
            status: 201,
            body: { id: user.id }
        };
    } catch (error) {
        return {
            status: 400,
            body: { error: error.message }
        };
    }
}
