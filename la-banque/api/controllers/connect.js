'use strict';

module.exports = {
  connect: connect
};

let db = require('./surreal.js');
function connect(req, res) {
  const person = req.swagger.params.user.value;
  db.query('SELECT * FROM user WHERE email = "' + person.email +'"').
  then((result) => {
    if(result[0].result[0].verified){
      res.json(true);
    } else if(result[0].result[0].password === person.password && result[0].result[0].uuid === person.uuid){
      db.merge(result[0].result[0].id, {verified: true});
      res.json(true);
    } 
    else{
      res.json(false);
    }});
}
