export async function load({cookies}) {
    let products = [];
    let error = null;
    let email = cookies.get('email');
    try{
        const response = await fetch('http://localhost:10010/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email }),
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