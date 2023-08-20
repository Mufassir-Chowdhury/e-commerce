import { redirect } from '@sveltejs/kit';
import { cart } from '$lib/stores.js';
import { browser } from '$app/environment';

export async function load(){
    cart.set([]);
    browser && localStorage.setItem('cart', JSON.stringify([]));
    throw redirect(302, 'http://127.0.0.1:5173/');
}
