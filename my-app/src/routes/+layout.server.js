import { redirect } from '@sveltejs/kit';
export async function load({cookies, url}) {
    const loggedIn = cookies.get('loggedIn');
    const email = cookies.get('email');
    const response = await fetch('http://localhost:10020/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email }),
        });
    const res = await response.json();
    console.log(res);

    if(loggedIn == null || loggedIn !== 'true' ) {
        if(url.pathname !== '/signin' && url.pathname !== '/signup')
            throw redirect(302, '/signin');
    } else {
        return {
            loggedIn: true,
            verified: res,
        }
    }
}