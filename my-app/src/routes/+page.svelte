<script>
  export let data;
</script>

<div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl">Products</h2>
      {#if data.error != null}
        <p class="mt-2 text-sm text-red-500">{data.error}</p>
      {/if}
      <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-16">
        {#each data.products as product}
        <a href='/product/{product.slug}' class="group">
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img src={product.image} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="h-full w-full object-cover object-center group-hover:opacity-75">
          </div>
          <h3 class="mt-4 text-sm text-gray-700">{product.name}</h3>
          <p class="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
        </a>
        {/each}
      </div>
    </div>
  </div>