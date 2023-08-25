import { redirect } from "@sveltejs/kit";

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const trxID = data.get('trxID');
        const orderID = data.get('orderID');
        const amount = parseInt(data.get('amount'));
        console.log(trxID, orderID);
        const response = await fetch('http://localhost:10020/validate' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ trxID }),
        }).then(async (result) => {
            const res = await result.json();
            if(res){
                const response = await fetch('http://localhost:10030/confirm' , {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ orderID, amount }),
                }).then(async (result) => {
                    console.log(await result.json());
                    throw redirect(302, 'http://127.0.0.1:5175/');
                });
            }

        });
   }
}
