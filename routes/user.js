var bcrypt = require('bcrypt');
var crypto = require('crypto');
var mailer = require('./mailer');
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

console.log("Depopulating DB");
user.find({
    email: {$regex: ".*"}
})
    .then(function(results){
        results.forEach(entry =>
        {console.log("Removed:\n" + entry);
            entry.remove();});
    })
    .then(function(){
        console.log("Populating DB");
        var example = new user({
            name: 'admin',
            email: 'admin@test.com',
            slack: '@admintest',
            password: bcrypt.hashSync('password', SALT_FACTOR),
        })
        example.save(function(err){
            console.log(err?"Error: " + err : "Added:\n" + example);

        });
    });

//view page for adding users
exports.viewAddUser = function(req, res){
    res.redirect('user/addUser',
        {title: "Add User",
        heading: "Add User To System",
        failed: false,
        success: false});
}

//view page for adding users after success
exports.addedUser = function(req, res){
    res.render('user/addUser',
        {title: "Add User",
        heading: "Add User To System",
        failed: false,
        success: true});
}

//view page for adding users after failure
exports.failedAddUser = function(req, res){
    res.render('user/addUser',
        {title: "Add User",
            heading: "Add User To System",
            failed: true,});
}

//Add a new user to the database and send them their password in an email
exports.addUser = function(req, res){
    var email = req.body.email;
    var password = crypto.randomBytes(10).toString('hex');
    var salt = bcrypt.genSaltSync(SALT_FACTOR);
    var hash = bcrypt.hashSync(password, salt);

    var newUser = new user({
        email: email,
        password: hash,
    });

    newUser.save()
    .then(function(){
        mailer.sendAddUserEmail(email, password);
        res.render('/user/addUser/added')
    })
        .catch(function(err){
            console.log("Error: " + err);
            res.render('/user/addUser/failed');
        });
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
            .then(function(){
                res.redirect('/user/userProfile');
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
        if(result) {
            hash = result.password;

            //compare the hash in the collection to the hash of the presented password
            if (hash && password
                && bcrypt.compareSync(password, hash)) {
                console.log('pass');
                req.session.email = email;
                req.session.authenticated = true;
                req.session.userID = result._id;
                res.redirect('/home');
            }
            else {
                console.log(req.body.email + ' fail ' + password);
                res.redirect('/failedLogin');
            }
        }
        else{
            res.redirect('/failedLogin');
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

//Delete user
exports.deleteUser = function(req, res){
    var email = req.session.email;
    var password = req.body.password;

    user.findOne({
        email: email,
    }).then(
        function(result){
            console.log(result);
            var hash = result.password;
            if(hash && password &&
                bcrypt.compareSync(password, hash)) {
                console.log("PASSWORDS MATCH------------------------------\n" +
                    "DELETING USER xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
                result.remove();
            }
        }
    )
        .then(function(){
            req.session.authenticated = false;
            res.redirect('/');
        }).catch(
        function(error){
            console.log(error);
        }
    );

}

exports.forgotPassword = function(req, res){
    res.render('forgotPassword', {title: "Forgotten Password", sentEmail: false});
}

exports.resetPassword = function(req, res){
    res.render('forgotPassword', {title: "Forgotten Password", sentEmail: true});
}

exports.logout = function(req, res){

    delete req.session.authenticated;
    res.redirect('/');
};