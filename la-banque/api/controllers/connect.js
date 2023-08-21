'use strict';

module.exports = {
  connect: connect
};

let db = require('./surreal.js');

// connect bank account to the e-commerce
function connect(req, res) {
  const person = req.swagger.params.user.value;

  // search for the user information from the bank database
  db.query('SELECT * FROM user WHERE email = "' + person.email +'"').
  then((result) => {

    if(result[0].result[0].verified){
      // if the e-commerce for this user is already verified, return true
      res.json(true);
    
    } else if(result[0].result[0].password === person.password && result[0].result[0].uuid === person.uuid){
      
      // if the e-commerce for this user is not verified, but the password and uuid are correct, return true and set verified to true
      db.merge(result[0].result[0].id, {verified: true});
      res.json(true);
    
    } 
    else{
    
      // if the e-commerce for this user is not verified, and the password and uuid are incorrect, return false
      res.json(false);
    
    }}).catch((err) => {
      res.json(false);
    })
}
