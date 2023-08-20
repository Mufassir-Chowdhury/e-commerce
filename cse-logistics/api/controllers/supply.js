'use strict';

module.exports = {
  supply: supply
};

const db = require('./surreal.js');

// create a new supply order
function supply(req, res) {
    const order = req.swagger.params.supply.value;

    // validate the transaction id with the bank API that the transaction actually took place
    const response = fetch('http://localhost:10020/validate' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ trxID }),
        }).then((result) => {

            if(result){

                // create a new supply order in the e-commerce database
                db.create('supply', {email: order.email, trxID: order.trxID, cart: order.cart}).then((result) => {
                    res.json(result[0].id);
                })
            } else{

                // if the transaction id is invalid, throw an error
                throw new Error('Invalid transaction ID');
            }
        }).catch((err) => {
            res.json(err);
        });
}
