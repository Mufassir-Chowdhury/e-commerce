export async function load() {
    let products = [];
    let error = null;
    try{
        const response = await fetch('http://localhost:10010/inventory', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
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