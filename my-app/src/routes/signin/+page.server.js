import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({cookies, request}) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        try{
            const response = await fetch('http://localhost:10010/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password }),
            });
            const res = await response.json();
            if(res){
                cookies.set('id', res);
                cookies.set('loggedIn', 'true');
                cookies.set('email', email);
            }
        } catch(e){
            cookies.delete('id');
            cookies.delete('loggedIn');
            cookies.delete('email');
            return fail(422, {
                email: email,
                password: password,
                error: 'Invalid email or password',
            })
        }
        throw redirect(302, '/');

    }
}