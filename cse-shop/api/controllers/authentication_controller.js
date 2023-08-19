'use strict';

module.exports = {
  signin: signin,
  signup: signup
};

function signup(req, res) {

    if(req.swagger.params.user.value.name == "mufassir"){
        res.json(true);
    } else{
        res.json(false);
    }
}


function signin(req, res) {
    console.log(req.swagger.params.user.value.email);
    if(req.swagger.params.user.value.email == "mac22214u@gmail.com" || req.swagger.params.user.value.email == "mufassir73@student.sust.edu"){
        res.json(true);
    } else{
        res.json(false);
    }
}
