<script>
    import { cart } from '$lib/stores.js';

    let cartItems;
    const unsubscribe = cart.subscribe(value => {
        cartItems = value;
    });
</script>
{#each cartItems as item}
    {item.id}
{/each}
