import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const trxID = data.get('trxID');
        const amount = parseInt(cookies.get('amount'));
        const cart = JSON.parse(data.get('cart'));
        const response = await fetch('http://localhost:10010/order' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email, trxID, amount, cart}),
        }).then(async (result) => {
            console.log(await result.json());
                });
        throw redirect(302, 'http://127.0.0.1:5173/clearCart');
   }
}
