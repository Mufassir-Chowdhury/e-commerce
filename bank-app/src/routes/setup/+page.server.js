import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({cookies, request}) => {
        const data = await request.formData();
        const email = cookies.get('email');
        const uuid = data.get('uuid').toString();
        const password = data.get('password');
        const response = await fetch('http://localhost:10020/connect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email, uuid, password }),
        });
        const res = await response.json();
        if(res){
            throw redirect(302, 'http://127.0.0.1:5173');
        } else{
            return fail(422, 'Invalid email or password');
        }

   }
}