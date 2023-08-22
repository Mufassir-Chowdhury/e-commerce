'use strict';

module.exports = {
  signin: signin,
};
const db = require('./surreal.js');

function signin(req, res) {
    const person = req.swagger.params.user.value;
    try{

        // check if the user exists in the e-commerce site and the password is correct
        db.query("SELECT * FROM user WHERE uuid = '" + person.uuid + "' AND password = '" + person.password + "';"
        ).then((result) => {

            // return the id of the user if there is a match
            if(result[0].result.length > 0){
                res.json(result[0].result[0].email);
            } else{
                res.status(204).send();
            }

        }).catch((err) => {
            res.status(204).send(err);
        })
    } catch (e) {
        res.status(204).send(e);
    }
}
