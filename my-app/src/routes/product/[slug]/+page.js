export async function load({ params }) {
    const product = params.slug;
    const response = await fetch(`http://localhost:10010/product/` + product, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
    return {
        products: response.json()
    };
}