import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({cookies, request}) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');
        const name = data.get('name');
        const response = await fetch('http://localhost:10010/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ name, email, password }),
        });
        console.log(JSON.stringify({ name, email, password }));
        const res = await response.json();
        console.log(res);
        if(res){
            cookies.set('loggedIn', 'true');
            cookies.set('email', email);
            throw redirect(302, '/');
        } else{
            return fail(422, {
                name: name,
                email: email,
                password: password,
                error: 'Invalid email or password',
            })
        }
    }
}