import { browser } from '$app/environment';
import {writable} from 'svelte/store';

let localData = browser ? localStorage.getItem('cart'): null;
export const cart = writable(localData ? JSON.parse(localData) : []);
