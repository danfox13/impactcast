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

var example = new user({
    email: 'admin@test.com',
    password: bcrypt.hashSync('password', SALT_FACTOR),
})
example.save(function(err){
    if(err){
        console.log(err);
    }
});

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

//Modify a user's password
exports.changePassword = function(req, res){

    var newPass = req.body.newPassword;
    var newPassCheck = req.body.newPasswordCheck;
    var email = req.session.email;

    console.log("CHANGING PASSWORD =======================================\n" +
        "Email = " + email +
        "\nOld Password = " + req.body.oldPassword +
        "\nNew Password = " + newPass +
        "\nCheck = " + newPassCheck);

    if(newPass && newPassCheck &&
        newPass === newPassCheck){

        user.findById(email)
            .then(function(err, result){
                 if(err){
                     console.log("Error: " + err);
                 }
                 else{
                     var hash = results.password;
                     var password = req.body.oldPassword;
                     if(hash && password &&
                     bcrypt.compareSync(password, hash)){
                            console.log("PASSWORDS MATCH------------------------------\n" +
                                "SAVING NEW PASSWORD HASH-----------------------------");
                             results.password = bcrypt.hashSync(newPass, SALT_FACTOR);
                         }
                     }
                     result.save();
                }
            )
            .catch(function(err){
                console.log("Error: " + err);
            });
    }
}

exports.login = function(req, res){

    let hash;
    var email = req.body.email;
    var password = req.body.pwd;
    user.findOne({
        email: email,
    }).then(function (results) {
        hash = results.password;

        //compare the hash in the collection to the hash of the presented password
        if(hash && password
            && bcrypt.compareSync(password, hash)){
            console.log('pass');
            req.session.email = email;
            req.session.authenticated = true;
            res.redirect('/home');
        }
        else{
            console.log(req.body.email + ' fail ' + password);
            res.redirect('/');
        }
    });
};

//Link to viewUserProfile
exports.viewUserProfile = function(req, res){
    res.render('user/userProfile',
        {title: 'User Profile',
        email: req.session.email});
}

//TODO Get information about the account from the request object.
exports.viewEditProfile = function(req, res){
    console.log("EMAIL: " + req.session.email);
    res.render('user/editProfile',
        {title: 'Edit Profile',
        email: req.session.email});
}

exports.logout = function(req, res){

    delete req.session.authenticated;
    res.redirect('/');

};