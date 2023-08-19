<script>
  import { cart } from '$lib/stores.js';
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
        id: data.products.id,
        name: data.products.name,
        image: data.products.image,
        price: data.products.price,
        color: colorChecked,
        size: sizeChecked,
        quantity: quantity
      });
      return items;
    });
  }
</script>

<div class="bg-white">
    <div class="pt-6">
        
        <div class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{data.products.name}</h1>
        </div>
  
        <!-- Options -->
        <div class="mt-4 lg:row-span-3 lg:mt-0">
          <h2 class="sr-only">Product information</h2>
          <p class="text-xl tracking-tight text-gray-500">${price}&#215;{quantity}=<span class="text-3xl text-gray-900">${totalPrice}</span></p>
  
          
  
          <!-- <form class="mt-10"> -->
            <div>
              <h3 class="text-sm font-medium text-gray-900">Color</h3>
  
              <fieldset class="mt-4">
                <legend class="sr-only">Choose a color</legend>
                <div class="flex items-center space-x-3">
                  {#each data.products.colors as color}
                    <label class:ring-2={color == colorChecked} class="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
                      <input type="radio" name="color_choice" value={color} bind:group={color_choice} class="sr-only" aria-labelledby="color-choice-0-label">
                      <span id="color-choice-0-label" class="sr-only">{color}</span>
                      <span aria-hidden="true" class="h-8 w-8 bg-{color}-500 rounded-full border border-black border-opacity-10"></span>
                    </label>
                  {/each}
                </div>
              </fieldset>
            </div>
  
            <div class="mt-10">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-gray-900">Size</h3>
              </div>
  
              <fieldset class="mt-4">
                <legend class="sr-only">Choose a size</legend>
                <div class="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                  {#each data.products.sizes as size}
                  <label class:border-indigo-500={size == sizeChecked} class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm">
                    <input type="radio" name="size-choice" value="{size}" bind:group={size_choice} class="sr-only" aria-labelledby="size-choice-1-label">
                    <span id="size-choice-1-label">{size}</span>
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
            <!-- </form> -->
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
  
          <!-- <div class="mt-10">
            <h3 class="text-sm font-medium text-gray-900">Highlights</h3>
  
            <div class="mt-4">
              <ul role="list" class="list-disc space-y-2 pl-4 text-sm">
                <li class="text-gray-400"><span class="text-gray-600">Hand cut and sewn locally</span></li>
                <li class="text-gray-400"><span class="text-gray-600">Dyed with our proprietary colors</span></li>
                <li class="text-gray-400"><span class="text-gray-600">Pre-washed &amp; pre-shrunk</span></li>
                <li class="text-gray-400"><span class="text-gray-600">Ultra-soft 100% cotton</span></li>
              </ul>
            </div>
          </div> -->
  
        </div>
      </div>
    </div>
  </div>
  