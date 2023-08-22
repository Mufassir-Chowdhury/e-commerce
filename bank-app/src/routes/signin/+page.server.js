import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({cookies, request}) => {
        const data = await request.formData();
        const uuid = data.get('uuid').toString();
        const password = data.get('password');
        try{
            const response = await fetch('http://localhost:10020/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ uuid, password }),
            });
            const res = await response.json();
            if(res){
                cookies.set('uuid', uuid);
                cookies.set('loggedInBank', 'true');
                cookies.set('emailBank', res);
            } else {
                return fail(422, {
                    uuid: uuid,
                    password: password,
                    error: 'Invalid uuid or password'
            })};
        } catch(e){
            return fail(422, {
                uuid: uuid,
                password: password,
                error: 'No Bank Account Found'
            });
        }
        throw redirect(302, '/');

   }
}