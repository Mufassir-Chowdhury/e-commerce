import { redirect } from '@sveltejs/kit';
export function load({cookies, url}) {
    const loggedIn = cookies.get('loggedIn');
    if(loggedIn == null || loggedIn !== 'true' ) {
        if(url.pathname !== '/signin' && url.pathname !== '/signup')
            throw redirect(302, '/signin');
    } else {
        return {
            loggedIn: true
        }
    }
}