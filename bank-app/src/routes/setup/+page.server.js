import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({cookies, request}) => {
        const data = await request.formData();
        const email = cookies.get('email');
        const uuid = data.get('uuid').toString();
        const password = data.get('password');
        try{
            const response = await fetch('http://localhost:10020/connect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, uuid, password }),
            });
            const res = await response.json();
            if(!res)
                return fail(422, {
                    uuid: uuid,
                    password: password,
                    error: 'Invalid uuid or password'
                });
        } catch(e){
            return fail(422, {
                uuid: uuid,
                password: password,
                error: 'No Bank Account Found'
            });
        }
        throw redirect(302, 'http://127.0.0.1:5173');

   }
}