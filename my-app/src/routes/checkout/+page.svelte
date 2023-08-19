<script>
    import { cart } from '$lib/stores.js';

    let cartItems;
    cart.subscribe(value => {
        cartItems = value;
    });

    $: totalPrice = cartItems.reduce((total, item) => total + item.price*item.quantity, 0);

    function removeItem(index){
        cart.update((items) => {
            items.splice(index-1, 1);
            localStorage.setItem("cart", JSON.stringify(items));
            return items;
        });
    }
</script>   

<div class="grid grid-cols-2 p-10 gap-10 bg-gray-50">
    <section class="col-span-1 gap-y-4 flex flex-col">
        <h3 class="text-lg font-semibold ">Contact Information</h3>
        <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
                <input id="email" name="email" type="email" autocomplete="email" disabled placeholder="mac22214u@gmail.com" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
        </div>
        <div>
            <label for="address" class="block text-sm font-medium leading-6 text-gray-900">Address</label>
            <div class="mt-2">
                <input id="address" name="address" type="text" placeholder="Address" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div class="col-span-1">
                <label for="city" class="block text-sm font-medium leading-6 text-gray-900">City</label>
                <div class="mt-2">
                    <input id="city" name="city" type="text" placeholder="City" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
            </div>
            <div class="col-span-1">
                <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">phone</label>
                <div class="mt-2">
                    <input id="phone" name="phone" type="phone" placeholder="Phone" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
            </div>
        </div>
    </section>
    <section class="col-span-1">
        <h3 class="text-lg font-semibold mb-4">Order summary</h3>
        <div class="w-full bg-white rounded-lg shadow">
            <div class="space-y-6 flex flex-col  divide-y-2">
                {#each cartItems as item}
                    <div class="px-8 py-4 grid grid-cols-6 gap-6">
                        <div class="col-span-1 flex flex-col justify-center">
                            <img src={item.image} alt={item.name} class="w-20 h-20 rounded-lg object-cover">
                        </div>
                        <div class="col-span-4">
                            <h3 class="font-semibold">{item.name}</h3>
                            <p class="text-sm font-light text-gray-500">{item.color}</p>
                            <p class="text-sm font-light text-gray-500">{item.size}</p>
                            <p class="text-gray-500 pt-6">${item.price * item.quantity}</p>

                        </div>
                        <div class="col-span-1 flex flex-col justify-between text-center">
                            <button type="button" on:click={removeItem(item.index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                            </button>
                            <p class="text-sm font-light text-gray-500">{item.quantity}</p>
                        </div>
                    </div>
                {/each}
                <div class="px-8 py-4 gap-y-4 flex flex-col">
                    <div class="flex justify-between">
                        <p class="text-gray-500">Subtotal</p>
                        <p class="text-gray-500">${totalPrice}</p>
                    </div>
                    <div class="flex justify-between">
                        <p class="text-gray-500">Shipping</p>
                        <p class="text-gray-500">$5</p>
                    </div>
                    <div class="flex justify-between border-t-2 py-2">
                        <p class="text-gray-500">Total</p>
                        <p class="text-gray-500">${totalPrice + 5}</p>
                    </div>
                </div>
                <div class="px-8 py-4 ">
                    <button class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Pay</button>
                </div>
            </div>
        </div>
    </section>

</div>
