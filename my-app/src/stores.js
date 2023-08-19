import { persisted } from 'svelte-local-storage-store';


export const cart = persisted('cart', [])