export async function load() {
    const response = await fetch('http://localhost:10010/inventory', {
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