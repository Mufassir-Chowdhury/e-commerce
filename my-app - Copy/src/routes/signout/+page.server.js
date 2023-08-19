import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({cookies}) => {
        cookies.set('loggedIn', 'false');
        throw redirect(302, '/signin');
    }
}