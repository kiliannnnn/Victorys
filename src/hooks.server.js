import { parse } from 'cookie';
import User from '$lib/server/models/user';

export async function handle({ event, resolve }) {
    const cookies = parse(event.request.headers.get('cookie') || '');
    const userId = cookies.session_id;

    if (userId) {
        const user = await User.findByPk(userId);
        event.locals.user = user || null;
    } else {
        event.locals.user = null;
    }

    return await resolve(event);
}
