import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({cookies, request}) => {
        const data = await request.formData();
        const email = cookies.get('email');
        const amount = parseInt(cookies.get('amount'));
        const response = await fetch('http://localhost:10020/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email, amount }),
        });
        const res = await response.json();
        console.log(res);
        if(res != 'Failed'){
            cookies.set('transactionId', res);
            throw redirect(302, 'http://127.0.0.1:5173/placed');
        }

   }
}
export async function load({cookies, request}) {

    const email = cookies.get('email');
    const response = await fetch('http://localhost:10020/balance' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email }),
        });
    return {
        amount: response.json(),
        totalAmount: cookies.get('amount'),
    };
}