
export async function load({cookies}) {
    const email = cookies.get('email');
    const trxID = cookies.get('transactionId');
    return {
        email: email,
        trxID: trxID,
    };
}