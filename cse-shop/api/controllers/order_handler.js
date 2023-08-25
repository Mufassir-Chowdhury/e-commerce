'use strict';

module.exports = {
  order: order,
  orders: orders,
};

let db = require('./surreal.js');
const axios = require('axios');

// create a new order
function order(req, res) {
    const order = req.swagger.params.order.value;
    const time = new Date().toISOString();
    // create a new order in the e-commerce database
    db.create('order', {email: order.email, trxID: order.trxID, cart: order.cart, amount: order.amount, status: 'Pending', time: time})
    .then(async (result) => {

        // create a supply order to the supplier using their API
        const orderID = result[0].id;
        const trxID = order.trxID;
        const cart = order.cart;
        const amount = order.amount;
        try{
            axios.post('http://localhost:10030/supply', { orderID, trxID, amount, cart})
            .catch((err) => {
                console.log("axios.post error:", err);
            });

        } catch(e){
            console.log("axios.post error:", e);
        }
        // return the id of the created order
        res.json(result[0].id);
        
    }).catch((err) => {
        console.log(err)
        res.status(204).send(err);
    });
}

// get all orders
function orders(req, res) {
    const person = req.swagger.params.user.value;
    db.query('select * from order where email = "' + person.email +'" order by time desc').then((result) => {
        res.json(result[0].result);
    }).catch((err) => {
        res.json(err);
    });
}