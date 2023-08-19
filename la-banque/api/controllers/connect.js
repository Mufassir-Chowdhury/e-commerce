'use strict';

module.exports = {
  connect: connect
};

function connect(req, res) {
  if(req.swagger.params.user.value.email === "mufassir73@student.sust.edu"){
    res.json(true);
  } else{
    res.json(false);
  }
}
