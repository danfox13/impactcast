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
    name: 'admin',
    email: 'admin2@test.com',
    slack: 'AHandle',
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

        user.findOne({
            email: email,
        })
            .then(function(result){
                var hash = result.password;
                var password = req.body.oldPassword;
                if(hash && password &&
                    bcrypt.compareSync(password, hash)) {
                    console.log("PASSWORDS MATCH------------------------------\n" +
                        "SAVING NEW PASSWORD HASH-----------------------------");
                    result.password = bcrypt.hashSync(newPass, SALT_FACTOR);

                    result.save();
                }
            })
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
    }).then(function (result) {
        hash = result.password;

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
    var email = req.session.email;

    user.findOne({
        email: email,
    }).then(
        function(result){
            console.log(result);
            var name = result.name;
            var slack = result.slack;

            res.render('user/userProfile',
                {title: 'User Profile',
                    email: email,
                    name: name,
                    slack: slack});
        }
    ).catch(
        function(error){
            console.log(error);
        }
    );

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