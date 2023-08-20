'use strict';

module.exports = {
  payment: payment,
  balance: balance
};

let db = require('./surreal.js');
function payment(req, res) {
  const person = req.swagger.params.user.value;
  db.query('SELECT * FROM user WHERE email = "' + person.email +'"').
  then((result) => {
    if(result[0].result[0].balance < person.amount){
        
        res.json('Failed');
    } else{
        db.create('transaction', {user_id: result[0].result[0].id, amount: person.amount, status: 'paid'}).then
        ((result) => {
            console.log(result);
            res.json(result[0].id);
        });
        db.merge(result[0].result[0].id, {balance: result[0].result[0].balance - person.amount});
        db.query('SELECT * FROM user WHERE email = "bank@la-banque.com"').then((result) => { 
            db.merge(result[0].result[0].id, {balance: result[0].result[0].balance + person.amount});
        });
    }});
}

function balance(req, res) {
    const person = req.swagger.params.user.value;
    db.query('SELECT * FROM user WHERE email = "' + person.email +'"').
    then((result) => {
        res.json(result[0].result[0].balance);
    });
    }