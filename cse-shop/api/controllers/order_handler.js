'use strict';

module.exports = {
  order: order,
};

let db = require('./surreal.js');
function order(req, res) {
    const order = req.swagger.params.order.value;
    console.log(order);
    db.create('order', {email: order.email, trxID: order.trxID, cart: order.cart}
    ).then((result) => {
        res.json(result[0].id);
    }).catch((err) => {
        res.json(err);
    });
}