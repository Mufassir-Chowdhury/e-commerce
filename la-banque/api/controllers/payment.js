'use strict';

module.exports = {
  payment: payment,
  balance: balance,
  supplyPayment: supplyPayment
};

let db = require('./surreal.js');

// make a payment
function payment(req, res) {
  const person = req.swagger.params.user.value;

  // search for the user information from the bank database
  db.query('SELECT * FROM user WHERE email = "' + person.email +'"')
    .then((result) => {
        if(result[0].result[0].balance < person.amount){
            // if the user does not have enough money, return a failed message
            res.json('Failed');
        } else{
            // if the user has enough money, create a transaction
            db.create('transaction', {user_id: result[0].result[0].id, amount: person.amount, status: 'paid'})
            .then((result) => {
                res.json(result[0].id);
            });

            // update the user's balance
            db.merge(result[0].result[0].id, {balance: result[0].result[0].balance - person.amount});

            // update the bank's balance
            db.query('SELECT * FROM user WHERE email = "bank@e-commerce.com"').then((result) => { 
                db.merge(result[0].result[0].id, {balance: result[0].result[0].balance + person.amount});
            });
        }});
}
// make a payment
function supplyPayment(req, res) {
    const person = req.swagger.params.user.value;
  
    // search for the user information from the bank database
    db.query('SELECT * FROM user WHERE email = "bank@e-commerce.com"')
      .then((result) => {
            console.log("person.amount", person.amount);
              // if the user has enough money, create a transaction
              db.create('transaction', {user_id: result[0].result[0].id, amount: person.amount, status: 'paid'})
              .then((result) => {
                  res.json(result[0].id);
              });
              const amount =  Math.round(person.amount*.9);
              // update the user's balance
              db.merge(result[0].result[0].id, {balance: result[0].result[0].balance - amount});
  
              // update the bank's balance
              db.query('SELECT * FROM user WHERE email = "bank@supplier.com"').then((result) => { 
                  db.merge(result[0].result[0].id, {balance: result[0].result[0].balance + amount});
              });
          });
  }

// get the user's balance
function balance(req, res) {
    const person = req.swagger.params.user.value;

    // search for the user information from the bank database
    db.query('SELECT * FROM user WHERE email = "' + person.email +'"').
    then((result) => {
        res.json(result[0].result[0].balance);
    });
}