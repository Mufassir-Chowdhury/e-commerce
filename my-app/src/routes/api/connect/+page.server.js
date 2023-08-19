import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async () => {
        throw redirect(302, 'http://127.0.0.1:5174/setup');
   }
}