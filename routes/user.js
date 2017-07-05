// //Add a new user to database
// exports.newUser = function(email, password, name, slack){
//
// }
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var globals = require('../globals');
var dburl = globals.dburl.toString();
mongoose.createConnection(dburl);

var Schema = mongoose.Schema;
var userSchema = new Schema({
    email: {type: String, required: true, index:{unique: true}},
    name: {type: String},
    password: {type: String, required: true},
    slack: {type: String},
}, {collection: 'user'});

const SALT_FACTOR = 10;

var user = mongoose.model('user', userSchema);

//Add a new user to the database
exports.addUser = function(req, res){
    var email = req.body.email;
    var password = req.body.pwd;
    var salt = bcrypt.genSaltSync(SALT_FACTOR);
    var hash = bcrypt.hashSync(password, salt);

    var newUser = new user({
        email: email,
        password: hash,
    });
    newUser.save();
    res.redirect('/');
}

exports.login = function(req, res){

    // var example = new user({
    //     email: 'dummy@test.com',
    //     password: bcrypt.hashSync('pass123', 10),
    // })
    // example.save(function(err){
    //     if(err){
    //         console.log(err);
    //     }
    // });
    //
    // var example = new user({
    //     email: 'dummy2@test.com',
    //     password: bcrypt.hashSync('password', 10),
    // })
    // example.save(function(err){
    //     if(err){
    //         console.log(err);
    //     }
    // });

    let hash;
    var password = req.body.pwd;
    user.findOne({
        email: req.body.email,
    }).then(function (results) {
        hash = results.password;

        //compare the hash in the collection to the hash of the presented password
        if(hash !== undefined && password !== undefined
            && bcrypt.compareSync(password, hash)){
            console.log('pass');
            req.session.authenticated = true;
            res.redirect('/home');
        }
        else{
            console.log(req.body.email + ' fail ' + password);
            res.redirect('/');
        }
    });
};


exports.logout = function(req, res){

    delete req.session.authenticated;
    res.redirect('/');

};