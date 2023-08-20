'use strict';

module.exports = {
  order: order,
};

let db = require('./surreal.js');

// create a new order
function order(req, res) {
    const order = req.swagger.params.order.value;

    // create a new order in the e-commerce database
    db.create('order', {email: order.email, trxID: order.trxID, cart: order.cart})
    .then((result) => {

        // create a supply order to the supplier using their API
        const email = order.email;
        const trxID = order.trxID;
        const cart = order.cart;
        const response = fetch('http://localhost:10030/supply' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email, trxID, cart}),
        });

        // return the id of the created order
        res.json(result[0].id);
        
    }).catch((err) => {
        res.json(err);
    });
}