<script lang="ts">
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
            image: item.image,
            name: item.name,
            color: item.color,
            quantity: item.quantity,
            price: item.price,
        }
    });

    // const tableSimple: TableSource = {
    //     head: ['Photo', 'Name', 'color', 'quantity', 'price'],
    //     body: tableMapperValues(sourceData, ['image', 'name', 'color', 'quantity', 'price']),
    // };
</script>

<div class="m-10">
    <form method="POST" action="/api/verify" id={product.id}>
        <div class="w-full flex justify-between p-6 bg-slate-100">
            <div class="flex">
                <div class="flex flex-col">
                    <span class="text-sm">Order No.</span>
                    <span class="text-lg">{product.id.split(':')[1]}</span>
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
        </div>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Product Image
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Color
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Quantity
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Price
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {#each sourceData as item}

                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th>
                                    <img src={item.image} class="h-20">
                                </th>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.name}
                                </th>
                                <td class="px-6 py-4">
                                    {item.color}
                                </td>
                                <td class="px-6 py-4">
                                    {item.quantity}
                                </td>
                                <td class="px-6 py-4">
                                    ${item.price}
                                </td>
                            </tr>
                        {/each}
                        
                    </tbody>
                </table>
            </div>

        <!-- <Table source={tableSimple} /> -->
    </form>
</div>