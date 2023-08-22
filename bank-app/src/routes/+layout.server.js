import { redirect } from '@sveltejs/kit';
export async function load({cookies, url}) {
    const loggedIn = cookies.get('loggedInBank');    

    if(loggedIn == null || loggedIn !== 'true' ) {
        if(url.pathname !== '/signin' && url.pathname !== '/signup' && url.pathname !== '/setup' && url.pathname !== '/payment')
            throw redirect(302, '/signin');
    } else {
        return {
            loggedIn: true,
        }
    }
}