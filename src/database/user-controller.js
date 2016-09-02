const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user-model.js')
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

//initialize UserController as empty object
UserController = {};

//create method to add user to collection
UserController.add = (req, res, next) => {
    //initialize new instance of user
    let NewUser = new User({
        user: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    //save NewUser to collection
    NewUser.save((err, req) => {
        if (err) {
            console.error('err: ', err)
            res.send('error!!!!')
        }
    });
}

//create method to verify user
UserController.verify = (req, res, next) => {
    //make sure needed info is included
    if(!(req.body.name) || !(req.body.password)) {
        return;
    }
    //find user in collection
    User.findOne({'user': req.body.name}, 'password', (err, person) => {
        //if user not found
        if (!(person)) res.send('User not found');
        else {
            //get password from req
            const userPwd = req.body.password;
            //get password from user found in collection
            const hashedPwd = person.password;
            //verify passwords match
            bcrypt.compare(userPwd, hashedPwd, (err, result) => {
                if (result) {
                    next();
                } else console.log('invalid password')
            })
        }
    })
}

module.exports = UserController