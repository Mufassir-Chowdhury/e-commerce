export async function load({ params }) {
    const product = params.slug;
    let products = [];
    let error = null;
    try{
        const response = await fetch(`http://localhost:10010/product/` + product, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            }).catch(e => {
                error = 'No Products Found';
            });
        products = await response.json();
    } catch(e){
        error = 'No Products Found';
    }
    return {
        products: products,
        error: error,
    };
}