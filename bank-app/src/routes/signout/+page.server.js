import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({cookies}) => {
        cookies.delete('uuid');
        cookies.delete('loggedInBank');
        cookies.delete('emailBank');
        throw redirect(302, '/signin');
    }
}