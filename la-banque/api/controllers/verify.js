'use strict';

module.exports = {
  verify: verify
};

function verify(req, res) {
  if(req.swagger.params.user.value.email === "mac22214u@gmail.com"){
    res.json(true);
  } else{
    res.json(false);
  }
}
