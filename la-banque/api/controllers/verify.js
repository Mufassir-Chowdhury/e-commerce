'use strict';

module.exports = {
  verify: verify
};

let db = require('./surreal.js');
function verify(req, res) {
  db.query('SELECT * FROM user WHERE email = "' + req.swagger.params.user.value.email +'"').
  then((result) => {
    if(result[0].result[0].verified){
      res.json(true);
    } else{
      res.json(false);
    }});
}
