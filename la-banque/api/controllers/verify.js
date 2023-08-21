'use strict';

module.exports = {
  verify: verify,
  validate: validate,
};

let db = require('./surreal.js');

// verify if a user is verified via e-commerce
function verify(req, res) {

  // search for the user information from the bank database
  db.query('SELECT * FROM user WHERE email = "' + req.swagger.params.user.value.email +'"').
  then((result) => {
    console.log(result[0]);
    // check if the user is verified
    if(result[0].result[0].verified){
      res.json(true);
    } else{
      res.json(false);
    }
  }).catch((err) => {
    res.json(false);
  })
}

// varify a transaction id is valid and the user has paid the amount
function validate(req, res) {

  // search for the transaction id in the bank database
  db.select(req.swagger.params.user.value.trxID).then((result) => {
    if(result.length > 0){
      res.json(true);
    } else{
      res.json(false);
    }
  });

}
