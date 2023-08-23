<script>
    import {cart} from "$lib/stores.js";
    import {browser} from "$app/environment";

    let cartItems;
    cart.subscribe(value => {
        cartItems = JSON.stringify(value);
    });
    export let data;
</script>
<div class="flex justify-center mt-10">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-28 w-28" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
</div>
<h1 class="text-center text-3xl font-semibold text-gray-900 dark:text-white">Payment Successful</h1>
<h2 class="text-center text-xl font-semibold text-gray-900 dark:text-white">Track order using - {data.trxID.split(':')[1]}</h2>

<h2 class="text-center text-xl font-semibold text-gray-900 dark:text-white">Thank you for using our service</h2>
<form class="py-10 flex flex-col items-center" method="POST" action="/api/order">
    <input name="email" value={data.email} hidden type="text">
    <input name="trxID" value={data.trxID} hidden type="text">
    <input name="cart" value={cartItems} hidden type="text">
    <button class="w-40 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Confirm Order</button>
</form>
