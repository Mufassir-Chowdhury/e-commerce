'use strict';

module.exports = {
  supply: supply,
  supplies: supplies,
  confirm: confirm,
};

const db = require('./surreal.js');
const axios = require('axios');
// create a new supply order
function supply(req, res) {
    const order = req.swagger.params.supply.value;
    const time = new Date().toISOString();
    // create a new supply order in the e-commerce database
    db.create('supply', {orderID: order.orderID, trxID: order.trxID, amount: order.amount, status: 'Pending', cart: order.cart, time: time}).then((result) => {
        res.json(result[0].id);
    }).then((result) => {
        console.log(result);
    });
}


// get all supply orders
function supplies(req, res) {
    db.query('select * from supply order by time desc').then((result) => {
        res.json(result[0].result);
    }).catch((err) => {
        res.json(err);
    });
}

// confirm a supply order
function confirm(req, res) {
    const order = req.swagger.params.order.value;
    db.merge(order.orderID, {status: 'Confirmed'}).then((result) => {
        const amount = parseInt(order.amount);
        axios.post('http://localhost:10020/supplyPayment', { amount })
            .catch((err) => {
                console.log("axios.post error:", err);
            });
        res.json(result);
    }).catch((err) => {
        res.json(err);
    });
}