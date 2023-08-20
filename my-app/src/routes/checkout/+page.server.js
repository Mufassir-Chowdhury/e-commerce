import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({cookies, request}) => {
        const data = await request.formData();
        const amount = data.get('totalAmount');
        cookies.set('amount', amount);
        throw redirect(302, 'http://127.0.0.1:5174/payment');

    }
}