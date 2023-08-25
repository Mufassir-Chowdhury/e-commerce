<script lang="ts">
    import { Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
    type Cart = {
        image: string;
        name: string;
        color: string;
        quantity: number;
        price: number;
    }
    type Product = {
        id: string;
        amount: number;
        orderID: string;
        trxID: string;
        status: string;
        cart: Array<Cart>;
    }
    export let product: Product;
    const sourceData = product.cart.map((item) => {
        return {
            image: '<img src="' + item.image + '" class="h-20">',
            name: item.name,
            color: item.color,
            quantity: item.quantity,
            price: item.price,
        }
    });

    const tableSimple: TableSource = {
        head: ['Photo', 'Name', 'color', 'quantity', 'price'],
        body: tableMapperValues(sourceData, ['image', 'name', 'color', 'quantity', 'price']),
    };
</script>

<div class="m-10">
    <form method="POST" action="/api/verify" id={product.id}>
        <div class="w-full flex justify-between p-6 bg-slate-50 bg-opacity-20">
            <div class="flex">
                <div class="flex flex-col">
                    <span class="text-sm">Order No.</span>
                    <span class="text-lg">{product.orderID.split(':')[1]}</span>
                </div>
                <div class="flex flex-col ml-10">
                    <span class="text-sm">TrxID</span>
                    <span class="text-lg">{product.trxID.split(':')[1]}</span>
                </div>
                <div class="flex flex-col ml-10">
                    <span class="text-sm">Status</span>
                    <span class="text-lg">{product.status}</span>
                </div>
                <div class="flex flex-col ml-10">
                    <span class="text-sm">Total</span>
                    <span class="text-lg">${product.amount}</span>
                </div>
            </div>
            <input hidden type="text" value={product.id} name="orderID">
            <input hidden type="text" value={product.trxID} name="trxID">
            <input hidden type="number" value={product.amount} name="amount">
            {#if product.status === 'Pending'}
                <button type="submit" class="btn variant-filled" value={product.id}>Confirm</button>
            {/if}
        </div>
        <Table source={tableSimple} />
    </form>
</div>