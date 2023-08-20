'use strict';

module.exports = {
  signin: signin,
  signup: signup
};
const db = require('./surreal.js');


function signup(req, res) {
    const person = req.swagger.params.user.value;
    try{

        // create a new user in e-commerce site
        let created = db.create("person", {
            name: person.name,
            email: person.email,
            password: person.password,
        }).then((created) => {
        
            // return the id of the created user
            res.json(created[0].id);
        
        });
    } catch (e) {

        // if the user already exists, throw error
        console.error('ERROR', e);
        throw e;

    }
}


function signin(req, res) {
    const person = req.swagger.params.user.value;
    try{

        // check if the user exists in the e-commerce site and the password is correct
        const result = db.query("SELECT * FROM person WHERE email = '" + person.email + "' AND password = '" + person.password + "';"
        ).then((result) => {

            // return the id of the user if there is a match
            if(result[0].result.length > 0){
                res.json(result[0].result[0].id);
            } else{
                throw new Error('Invalid email or password');
            }
        });
    } catch (e) {
        console.error('ERROR', e);
        throw e;
    }
}
