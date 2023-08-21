import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({cookies}) => {
        cookies.delete('id');
        cookies.delete('loggedIn');
        cookies.delete('email');
        throw redirect(302, '/signin');
    }
}