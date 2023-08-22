<script>
  import { cart } from '$lib/stores.js';
  
  import { Button, Modal, Toast  } from 'flowbite-svelte'
  let defaultModal = false;

  export let data;
  var color_choice;
  var size_choice;
  const price = data.products.price;
  $: sizeChecked = size_choice ?? data.products.sizes[0];
  $: colorChecked = color_choice ?? data.products.colors[0];
  let quantity = 1;
  $: totalPrice = price*quantity;
  function increment(event){
    quantity += 1;
  }
  function decrement(event){
    quantity -= 1;

  }
  function addToCart(event){
    cart.update((items) => {
      items.push({
        index: items.length + 1,
        id: data.products.id,
        name: data.products.name,
        image: data.products.image,
        price: data.products.price,
        color: colorChecked,
        size: sizeChecked,
        quantity: quantity
      });
      localStorage.setItem("cart", JSON.stringify(items));
      return items;
    });
    defaultModal = true;
    setTimeout(() => {
      defaultModal = false;
    }, 2000);
  }
</script>

<Toast bind:open={defaultModal} autoclose  class="fixed bottom-5 left-1/2 right-1/2">
  <div class="flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-gradient-to-br from-red-300 to-blue-300 divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
    <svg class="w-5 h-5 text-red-600 dark:text-blue-500 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"/>
    </svg>
    <div class="pl-4 text-sm font-normal">Added to cart.</div>
  </div>
</Toast>

<div class="bg-white">
  <div class="pt-6">
    
    {#if data.error != null}
    <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
      <h1 class="text-2xl font-bold tracking-tight text-red-900 sm:text-3xl">{data.error}</h1>
    </div>
    {:else if data.products != []}
    <div class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{data.products.name}</h1>
        </div>
        <!-- Options -->
        <div class="mt-4 lg:row-span-3 lg:mt-0">
          <h2 class="sr-only">Product information</h2>
          <p class="text-xl tracking-tight text-gray-500">${price}&#215;{quantity}=<span class="text-3xl text-gray-900">${totalPrice}</span></p>
  
    
  
            <div class="mt-10">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-gray-900">Color</h3>
              </div>
  
              <fieldset class="mt-4">
                <legend class="sr-only">Choose a color</legend>
                <div class="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                  {#each data.products.colors as color}
                  <label class:border-indigo-500={color == colorChecked} class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm">
                    <input type="radio" name="size-choice" value="{color}" bind:group={color_choice} class="sr-only" aria-labelledby="size-choice-1-label">
                    <span id="size-choice-1-label">{color}</span>
                    <span  class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                  </label>
                  {/each}
                  
                </div>
              </fieldset>
            </div>

            <div class="mt-10">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-gray-900">Quantity</h3>
              </div>
  
              <fieldset class="mt-4">
                <legend class="sr-only">Choose a size</legend>
                <div class="flex gap-16">
                  <button type="button" on:click={increment} class="border-2 px-2 rounded-lg">+</button>
                  {quantity}
                  <button type="button" on:click={decrement} class="border-2 px-2 rounded-lg" disabled={quantity==1}>-</button>
                  
                  
                </div>
              </fieldset>
            </div>
            <fieldset>

            <button type="button" on:click={addToCart} class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add to bag</button>
            </fieldset>
        </div>
  
        <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          <!-- Description and details -->
          <div class="w-1/3">
            <h3 class="sr-only">Description</h3>
            <div class=" aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img src={data.products.image} alt="Model wearing plain white basic tee." class="h-full w-full object-cover object-center">
            </div>
  
            <div class="space-y-6">
              <p class="text-base text-gray-900">{data.products.description}</p>
            </div>
          </div>
  
        </div>
      </div>
      {/if}
    </div>
  </div>
  