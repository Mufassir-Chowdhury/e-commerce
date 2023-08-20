import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({cookies, request}) => {
        const data = await request.formData();
        const email = cookies.get('email');
        const amount = data.get('totalAmount');
        console.log(amount);
        cookies.set('amount', amount);
        throw redirect(302, 'http://127.0.0.1:5174/payment');

    }
}