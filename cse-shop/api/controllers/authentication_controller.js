'use strict';

module.exports = {
  signin: signin,
  signup: signup
};
const db = require('./surreal.js');


function signup(req, res) {
    const person = req.swagger.params.user.value;
    try{
        let created = db.create("person", {
            name: person.name,
            email: person.email,
            password: person.password,
        }).then((created) => {
            res.json(created[0].id);
        });
    } catch (e) {
        console.error('ERROR', e);
        throw e;
    }
}


function signin(req, res) {
    const person = req.swagger.params.user.value;
    try{
        const result = db.query("SELECT * FROM person WHERE email = '" + person.email + "' AND password = '" + person.password + "';"
        ).then((result) => {
            console.log(result[0].result[0]);
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
