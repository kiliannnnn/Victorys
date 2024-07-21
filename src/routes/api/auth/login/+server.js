import { authenticateUser } from '$lib/auth';
import { serialize } from 'cookie';

export async function POST({ request }) {
    const { email, password } = await request.json();
    try {
        const user = await authenticateUser(email, password);
        const cookie = serialize('session_id', user.id, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });
        return {
            status: 200,
            headers: {
                'Set-Cookie': cookie
            },
            body: { id: user.id }
        };
    } catch (error) {
        return {
            status: 401,
            body: { error: error.message }
        };
    }
}
