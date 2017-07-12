var bcrypt = require('bcrypt');
var crypto = require('crypto');
var mailer = require('./mailer');
var slack = require('./slack');
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
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isAdmin: Boolean,
}, {collection: 'user'});

//how computationally expensive it is to calculate the hash + salt
const SALT_FACTOR = 10;

var user = mongoose.model('user', userSchema);

exports.userModel = user;

//Depopulate the database and then add one admin user for testing
user.find({
    email: {$regex: ".*"}
})
    .then(function(results){
        console.log("Depopulating DB");
        results.forEach(function(entry)
        {console.log("Removed:\n" + entry);
            entry.remove();});
    })
    .then(function() {
        console.log("Populating DB");
        var example = new user({
            name: 'Owen',
            email: 'owen.jenkins@capgemini.com',
            slack: '@owenjenkins',
            password: bcrypt.hashSync('password', SALT_FACTOR),
            isAdmin: true,
        })
        example.save(function (err) {
            console.log(err ? "Error: " + err : "Added:\n" + example);
        }).then(function(){
        var example = new user({
            email: 'rosie.butcher@capgemini.com',
            password: bcrypt.hashSync('password', SALT_FACTOR),
            isAdmin: false,
        });
        example.save(function (err) {
            console.log(err ? "Error: " + err : "Added:\n" + example);
        }).then(function(){
            // slack.individualMessage('owen.jenkins@capgemini.com', "You've been assigned some more work!");
            // slack.generalMessage("Hello All!");
        });
        });
    });

//view page for adding users
exports.viewAddUser = function(req, res){
    res.render('user/addUser',
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

    //generate a random new password for the new user
    var password = crypto.randomBytes(10).toString('hex');

    //generate the hash of that password to add to the database
    var salt = bcrypt.genSaltSync(SALT_FACTOR);
    var hash = bcrypt.hashSync(password, salt);

    //create the entry for the new user
    var newUser = new user({
        email: email,
        password: hash,
        name: (req.body.name?req.body.name:email),
        slack: "Not Set",
    });

    //save the new user on the database
    newUser.save()
    .then(function(){

        //send the new user an email with their login details
        mailer.sendAddUserEmail(email, password);
        res.redirect('addedUser');
    })
        .catch(function(err){
            console.log("Error: " + err);
            res.redirect('failedAddUser');
        });
}

//Change a user's vanity name
exports.changeName = function(req, res){
    var userID = req.params.user;
    var name = req.body.value;
    console.log("GOT NEW NAME: " + name);
    //find the user currently logged in
    user.findOne({
        _id: userID,
    })
        .then(function(result){
            if(name.trim() !== ""){
                console.log("CHANGING USERNAME to " + name);

                result.name = name;
                //save the newly modified user entry in the database
                result.save();
            }
             else{
                name = result.email;
                result.name = null;
                //save the newly modified user entry in the database
                result.save();
            }
        })
        .then(function(){
            console.log("Saved with name: " + name);
            res.newValue = name;
            res.send();
            console.log("Sent response with " + res.newValue);
        })
        .catch(function(err){
            console.log("Error: " + err);
        });
}

//Change a user's password and send them an email
exports.changePassword = function(req, res){

    var newPass = req.body.newPassword;
    var newPassCheck = req.body.newPasswordCheck;
    var email = req.session.email;

    console.log("CHANGING PASSWORD FOR USER:\n" +
        "Email = " + email +
        "\nOld Password = " + req.body.oldPassword +
        "\nNew Password = " + newPass +
        "\nCheck = " + newPassCheck);

    //double check that the new passwords match and are different to the old
    if(newPass && newPassCheck &&
        newPass === newPassCheck &&
        newPass !== req.body.oldPassword){

        //find the user currently logged in
        user.findOne({
            email: email,
        })
            .then(function(result){

                //check that they entered the correct password for their account
                var hash = result.password;
                var password = req.body.oldPassword;
                if(hash && password &&
                    bcrypt.compareSync(password, hash)) {
                    console.log("PASSWORDS MATCH, SAVING NEW PASSWORD HASH");
                    result.password = bcrypt.hashSync(newPass, SALT_FACTOR);

                    //save the newly modified user entry in the database
                    result.save();
                    //send the user an email to let them know their password has been changed
                    mailer.sendPasswordChangedEmail(email);
                }
                else{
                    console.log("WRONG PASSWORD, DISPLAYING ERROR MSG");
                    res.render('user/userProfile',
                        {title: 'User Profile',
                            email: email,
                            name: req.session.name,
                            slack: req.session.slack,
                            isAdmin: req.session.viewerAdmin,
                            viewerAdmin: req.session.viewerAdmin,
                            viewerSelf: true,
                            id: req.session.id,
                            wrongPassword: true});
                }
            })
            .then(function(){
                res.render('user/userProfile',
                    {title: 'User Profile',
                        email: email,
                        name: req.session.name,
                        slack: req.session.slack,
                        isAdmin: req.session.viewerAdmin,
                        viewerAdmin: req.session.viewerAdmin,
                        viewerSelf: true,
                        id: req.session.id,
                        wrongPassword: false});
            })
            .catch(function(err){
                console.log("Error: " + err);
            });
    }
}

//Login to the system
exports.login = function(req, res){
    var email = req.body.email;
    var password = req.body.pwd;

    console.log("Attempted login: " + email + " and " + password);

    //find the entry for the user in the database
    user.findOne({
        email: email,
    }).then(function (result) {
        if(result) {
            var hash = result.password;

            //compare the hash in the collection to the hash of the presented password
            if (hash && password
                && bcrypt.compareSync(password, hash)) {

                //if they match, log the user in and authenticate the session
                console.log('pass');
                req.session.email = email;
                req.session.name = result.name;
                req.session.slack = result.slack;
                req.session.authenticated = true;
                req.session.userID = result._id;
                req.session.viewerAdmin = result.isAdmin,
                console.log("LOGGED IN USER: " + result);
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

exports.myProfile = function(req, res){
    res.redirect('/user/' + req.session.userID + '/viewProfile');
}

//Link to viewUserProfile
exports.viewUserProfile = function(req, res){
    console.log("REQ: " + req);
    console.log("ID: " + req.params.user);
    user.findOne({
        _id: req.params.user,
    }).then(
        function(result){
            console.log(result);
            var name = result.name;
            var slack = result.slack;
            var email = result.email;
            console.log("IS ADMIN? " + req.session.isAdmin);
            res.render('user/userProfile',
                {title: 'User Profile',
                    email: email,
                    name: name,
                    slack: slack,
                    isAdmin: result.isAdmin,
                    viewerAdmin: req.session.viewerAdmin,
                    viewerSelf: email === req.session.email,
                    id: result._id,
                wrongPassword: false});
        }
    ).catch(
        function(error){
            console.log(error);
        }
    );

}

//As an admin, delete a user
exports.deleteUser = function(req, res){
    var email = req.session.email;
    var password = req.body.adminPassword;

    var account;
    user.findOne({
        _id: req.params.user,
    }).then(function(result){
        account = result;
    })
    if(account) {
        user.findOne({
            email: email,
        }).then(
            function (result) {
                console.log(result);
                var hash = result.password;
                if (hash && password &&
                    bcrypt.compareSync(password, hash)) {

                    //if the user entered the correct password, get the user and delete them
                    console.log("PASSWORDS MATCH, DELETING USER");
                    account.remove();
                    mailer.sendAccountDeletedEmail(account.email);
                }
                else {
                    console.log("WRONG PASSWORD, DISPLAYING ERROR MSG");
                    res.redirect('/viewUsers');
                }
            }
        ).catch(
            function (error) {
                console.log(error);
            }
        );
    }
}

//Delete user
exports.deleteMe = function(req, res){
    console.log("Deleting myself");
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

                //if the user entered the correct password, delete their entry in the database
                console.log("PASSWORDS MATCH, DELETING USER");
                result.remove();
                mailer.sendAccountDeletedEmail(email);
            }
            else{
                console.log("WRONG PASSWORD, DISPLAYING ERROR MSG");
                res.render('user/userProfile', {
                    title: 'User Profile',
                    email: result.email,
                    name: result.name,
                    slack: result.slack,
                    wrongPassword: true});
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

//redirect to the forgotten password view
exports.forgotPassword = function(req, res){
    res.render('reset/forgotPassword', {title: "Forgotten Password", sentEmail: false, validEmail: true});
}

//generate a reset password link and email it to the user
exports.resetPassword = function(req, res){
    var email = req.body.email;
    var token = crypto.randomBytes(20).toString('hex');

    user.findOne({
        email: email,
    })
        .then(
        function(result) {
            console.log("Email = " + email + ", Result = " + result);
            if (result) {
                result.resetPasswordToken = token;
                result.resetPasswordExpires = Date.now() + 3600000; // expires in 1 hour
                result.save().then(function(){
                    console.log("Saved");

                    //send user the password reset link in an email
                    mailer.sendResetEmail(email, token);
                    console.log("Sent");
                    res.render('reset/forgotPassword', {title: "Forgotten Password", sentEmail: true, validEmail: true});
                });
            }
            else{
              res.redirect('/reset/invalidEmail');
            }
        })
}

//if the reset password link used is valid, redirect the user to a page where they can change their password
exports.resetPasswordLink = function(req, res) {

        user.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: {$gt: Date.now()}
        }).then(function (results) {
            if(results){
                res.render('reset/resetPassword', {title: "Reset Password", invalidLink: false, email: results.email});
            }
            else {
                res.render('reset/resetPassword', {title: "Reset Password", invalidLink: true, email: null});
            }
        }).catch(function(err){
            console.log("Error: " + err);
            res.redirect('/');
        });
}

//if the user entered an invalid email, redirect them back with an alert
exports.invalidEmail = function(req, res){
    res.render('reset/forgotPassword', {title: "Forgotten Password", sentEmail: false, validEmail: false});
}

//change a user's password without them having to know the old one (only used through reset link)
exports.changeForgottenPassword = function(req, res){
    var newPass = req.body.newPassword;
    var newPassCheck = req.body.newPasswordCheck;
    var email = req.params.email;

    console.log("CHANGING PASSWORD \n" +
        "Email = " + email +
        "\nNew Password = " + newPass +
        "\nCheck = " + newPassCheck);

    if(newPass && newPassCheck &&
        newPass === newPassCheck){

        user.findOne({
            email: email,
        })
            .then(function(result) {
                if (result) {
                console.log("GOT CORRECT RESET LINK, SAVING NEW PASSWORD HASH");
                result.password = bcrypt.hashSync(newPass, SALT_FACTOR);
                result.resetPasswordToken = null;
                result.resetPasswordExpires = Date.now();
                result.save();
            }
            })
            .then(function(){
                mailer.sendPasswordChangedEmail(email);
                console.log("Redirect to login");
                res.redirect('/');
            })
            .catch(function(err){
                console.log("Error: " + err);
            });
    }
}

//View all users page
exports.viewUsers = function(req, res){
    user.findOne({
        email: req.session.email,
    }).then(function(viewer){
        user.find({
            email: {$regex: ".*"}
        }).then(function(results){
            res.render('user/viewUsers', {title: "View Users",
                heading: "View Users",
                users: results,
                viewer: viewer,
                email: req.session.email,
            });
        });
    });
}

//Logout
exports.logout = function(req, res){

    delete req.session.authenticated;
    res.redirect('/');
};