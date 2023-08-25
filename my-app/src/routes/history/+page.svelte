<script>
	import Order from './order.svelte';
	export let data;
</script>
<h1 class="title text-center p-10 text-3xl">Order History</h1>
{#if data.products.length === 0}
	<h1 class="text-center text-3xl">No Orders</h1>
{:else}
	{#each data.products as product}
		<Order product={product}/>
	{/each}
{/if}