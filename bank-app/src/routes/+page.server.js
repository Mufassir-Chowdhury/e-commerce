export async function load({cookies}) {

    const email = cookies.get('emailBank');
    const response = await fetch('http://localhost:10020/balance' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email }),
        });
    return {
        balance: response.json(),
        email: email,
    };
}