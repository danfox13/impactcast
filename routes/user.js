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
    email: {type: String, required: true, index: {unique: true}},
    name: {type: String},
    password: {type: String, required: true},
    slack: {type: String},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isAdmin: Boolean,
    hints: Boolean
}, {collection: 'user'});

//how computationally expensive it is to calculate the hash + salt
const SALT_FACTOR = 10;

var user = mongoose.model('user', userSchema);

exports.userModel = user;

// //========================TESTING====================================
// //Depopulate the database and then add one admin user for testing
// user.find({
//     email: {$regex: ".*"}
// })
//     .then(function (results) {
//         console.log("Depopulating DB");
//         results.forEach(function (entry) {//console.log("Removed:\n" + entry);
//             entry.remove();
//         });
//     })
//     .then(function () {
//         console.log("Populating DB");
//         var example = new user({
//             name: 'Owen',
//             email: 'owen.jenkins@capgemini.com',
//             slack: '@owenjenkins',
//             password: bcrypt.hashSync('password', SALT_FACTOR),
//             isAdmin: true,
//         })
//         example.save(function (err) {
//             //console.log(err ? "Error: " + err : "Added:\n" + example);
//         }).then(function () {
//             var example = new user({
//                 email: 'rosie.butcher@capgemini.com',
//                 password: bcrypt.hashSync('password', SALT_FACTOR),
//                 isAdmin: false,
//             });
//             example.save(function (err) {
//                 //console.log(err ? "Error: " + err : "Added:\n" + example);
//             }).then(function () {
//                 slack.individualMessage('owen.jenkins@capgemini.com', "You've been assigned some more work!");
//                 slack.generalMessage("Hello All!");
//             });
//         });
//     });

//view page for adding users
exports.viewAddUser = function (req, res) {
    res.render('user/addUser',
        {
            title: "Add User",
            heading: "Add User To System",
            success: (req.params.result === "1"),
            failed: (req.params.result === "2"),
        });
}

//Add a new user to the database and send them their password in an email
exports.addUser = function (req, res) {
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
        name: (req.body.name ? req.body.name : null),
        slack: (req.body.slack ? req.body.slack : null),
        isAdmin: req.body.isAdmin,
    });

    //save the new user on the database
    newUser.save()
        .then(function () {

            //send the new user an email with their login details
            mailer.sendAddUserEmail(email, password);
                res.redirect('addUser/1');
        })
        .catch(function (err) {
            console.log("Error: " + err);
            res.redirect('addUser/2');
        });
}

//Change a user's vanity name
exports.changeName = function (req, res) {
    var userID = req.params.user;
    var name = req.body.value;

    //find the user currently logged in
    user.findOne({
        _id: userID,
    })
        .then(function (result) {
            if (name.trim() !== "") {

                result.name = name;

                //save the newly modified user entry in the database
                result.save();
            }
            else {
                name = result.email;
                result.name = null;

                //save the newly modified user entry in the database
                result.save();
            }
        })
        .then(function () {
            res.newValue = name;
            res.send();
        })
        .catch(function (err) {
            console.log("Error: " + err);
        });
}

//Change a user's slack handle
exports.changeSlack = function (req, res) {
    var email = req.session.email;
    var newSlack = req.body.newSlack;

    //find the user currently logged in
    user.findOne({
        email: email,
    })
        .then(function (result) {
            //check that they entered the correct password for their account
            var hash = result.password;
            var password = req.body.password;
            if (hash && password &&
                bcrypt.compareSync(password, hash)) {

                if (newSlack.trim() !== "@") {

                    result.slack = newSlack;

                    //save the newly modified user entry in the database
                    result.save();
                }
                else {
                    slack = null;
                    newSlack = null;
                    //save the newly modified user entry in the database
                    result.save();
                }
            }
            else{
                res.redirect('/user/' + req.session.userID + '/viewProfile/1');
            }
        }).then(function(){
        res.redirect('/user/' + req.session.userID + '/viewProfile');
    })
        .catch(function (err) {
            console.log("Error: " + err);
        });
}

//Change a user's password and send them an email
exports.changePassword = function (req, res) {

    var newPass = req.body.newPassword;
    var newPassCheck = req.body.newPasswordCheck;
    var email = req.session.email;

    //double check that the new passwords match and are different to the old
    if (newPass && newPassCheck &&
        newPass === newPassCheck &&
        newPass !== req.body.oldPassword) {

        //find the user currently logged in
        user.findOne({
            email: email,
        })
            .then(function (result) {

                //check that they entered the correct password for their account
                var hash = result.password;
                var password = req.body.oldPassword;
                if (hash && password &&
                    bcrypt.compareSync(password, hash)) {
                    result.password = bcrypt.hashSync(newPass, SALT_FACTOR);

                    //save the newly modified user entry in the database
                    result.save();

                    //send the user an email to let them know their password has been changed
                    mailer.sendPasswordChangedEmail(email);
                }
                else {
                    res.redirect('/user/' + req.session.userID + '/viewProfile/1');
                }
            })
            .then(function () {
                res.redirect('/user/' + req.session.userID + '/viewProfile');
            })
            .catch(function (err) {
                console.log("Error: " + err);
            });
    }
}

//Login to the system
exports.login = function (req, res) {
    var email = req.body.email;
    var password = req.body.pwd;

    //find the entry for the user in the database
    user.findOne({
        email: email,
    }).then(function (result) {
        if (result) {
            var hash = result.password;

            //compare the hash in the collection to the hash of the presented password
            if (hash && password
                && bcrypt.compareSync(password, hash)) {

                //if they match, log the user in and authenticate the session
                req.session.email = email;
                req.session.enableHints = result.hints;
                req.session.name = result.name;
                req.session.slack = result.slack;
                req.session.authenticated = true;
                req.session.userID = result._id;
                req.session.viewerAdmin = result.isAdmin,
                    res.redirect('/home');
            }
            else {
                res.redirect('/reset/login/1');
            }
        }
        else {
            res.redirect('/reset/login/1');
        }
    }).catch(function (err) {
        console.log("Error: " + err);
    });
};

exports.loadLogin = function(req, res){
    res.render('login', {
        title: "Login",
        failedLogin: (req.params.result === "1")
    });
}

//redirect user to their own profile page
exports.myProfile = function (req, res) {
    res.redirect('/user/' + req.session.userID + '/viewProfile/');
}

//Link to viewUserProfile
exports.viewUserProfile = function (req, res) {

    user.findOne({
        _id: req.params.user,
    }).then(
        function (result) {
            //console.log(result);
            var name = result.name;
            var slack = result.slack;
            var email = result.email;
            res.render('user/userProfile',
                {
                    title: 'User Profile',
                    email: email,
                    name: name,
                    slack: slack,
                    isAdmin: result.isAdmin,
                    viewerAdmin: req.session.viewerAdmin,
                    viewerSelf: email === req.session.email,
                    id: result._id,
                    wrongPassword: (req.params.forgot === "1"),
                    hints: result.hints,
                });
        }
    ).catch(
        function (error) {
            console.log("Error: " + error);
        }
    );

}

//show the page for deleting a user
exports.showDeleteUser = function (req, res) {
    user.findOne({
        _id: req.params.user,
    }).then(function (result) {
        res.render('user/deleteUser', {
            title: "Delete User",
            heading: "Delete User",
            user: result._id,
            email: result.email,
            success: (req.params.resilt === "1"),
            failed: (req.params.result === "2"),
            wrongPassword: (req.params.result === "3"),
            hints: req.session.hints,
        });
    });
}

//As an admin, delete a user
exports.deleteUser = function (req, res) {
    var email = req.session.email;
    var password = req.body.adminPassword;

    //get the details of the user to be deleted
    var account;
    user.findOne({
        _id: req.params.user,
    }).then(function (result) {
        account = result;
        if (account) {

            //get the details of the admin trying to delete the user
            user.findOne({
                email: email,
            }).then(
                function (result) {

                    //check the admin entered the correct password
                    var hash = result.password;
                    if (hash && password &&
                        bcrypt.compareSync(password, hash)) {

                        //if the user entered the correct password,
                        //get the user and delete them
                        account.remove().then(function () {
                            mailer.sendAccountDeletedEmail(account.email);
                            res.redirect('/user/' + req.params.user + '/deleteUser/1');
                        })

                    }
                    else {

                        //show a wrong password warning if the admin password was incorrect
                        res.redirect('/user/' + req.params.user + '/deleteUser/3');
                    }
                }
            )
        } else {

            //display an error message if the action couldn't be performed
            res.redirect('/user/' + req.params.user + '/deleteUser/2');
        }
    }).catch(function (err) {
        console.log("Error: " + err);
    });
}

//delete a user's own account
exports.deleteMe = function (req, res) {

    var email = req.session.email;
    var password = req.body.password;

    //get the details of the user
    user.findOne({
        email: email,
    }).then(
        function (result) {
            var hash = result.password;

            //check the user entered the correct password
            if (hash && password &&
                bcrypt.compareSync(password, hash)) {

                //if the user entered the correct password, delete their entry in the database
                result.remove();
                mailer.sendAccountDeletedEmail(email);
            }
            else {

                //show a wrong password warning if the password was incorrect
                res.redirect('/user/' + req.session.userID + '/viewProfile/1');
            }
        }
    )
        .then(function () {
            req.session.authenticated = false;
            res.redirect('/');
        }).catch(
        function (error) {
            console.log("Error: " + error);
        }
    );

}

//redirect to the forgotten password view
exports.forgotPassword = function (req, res) {
    res.render('reset/forgotPassword', {
        title: "Forgotten Password",
        sentEmail: (req.params.result === "1"),
        invalidEmail: (req.params.result === "2")
    });
}

//generate a reset password link and email it to the user
exports.resetPassword = function (req, res) {
    var email = req.body.email;
    var token = crypto.randomBytes(20).toString('hex');

    //get the details of the user associated with the email given
    user.findOne({
        email: email,
    })
        .then(
            function (result) {
                if (result) {
                    result.resetPasswordToken = token;
                    result.resetPasswordExpires = Date.now() + 3600000; // expires in 1 hour
                    result.save().then(function () {

                        //send user the password reset link in an email
                        mailer.sendResetEmail(req, email, token);
                        res.redirect('/reset/forgotPassword/1');
                    });
                }
                else {
                    res.redirect('/reset/forgotPassword/2');
                }
            }).catch(function (err) {
        console.log("Error: " + err);
    });
}

//if the reset password link used is valid, redirect the user to a page where they can change their password
exports.resetPasswordLink = function (req, res) {

    //get the details of the user the token belongs to, and check it hasn't expired
    user.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {$gt: Date.now()}
    }).then(function (results) {
        if (results) {
            res.render('reset/resetPassword', {
                title: "Reset Password",
                invalidLink: false,
                email: results.email
            });
        }
        else {
            res.render('reset/resetPassword', {
                title: "Reset Password",
                invalidLink: true,
                email: null
            });
        }
    }).catch(function (err) {
        console.log("Error: " + err);
        res.redirect('/');
    });
}

//change a user's password without them having to know the old one (only used through reset link)
exports.changeForgottenPassword = function (req, res) {
    var newPass = req.body.newPassword;
    var newPassCheck = req.body.newPasswordCheck;
    var email = req.params.email;

    //check the two passwords given match
    if (newPass && newPassCheck &&
        newPass === newPassCheck) {

        //get the details of the user to reset the password of
        user.findOne({
            email: email,
        })
            .then(function (result) {
                if (result) {
                    result.password = bcrypt.hashSync(newPass, SALT_FACTOR);
                    result.resetPasswordToken = null;
                    result.resetPasswordExpires = Date.now();
                    result.save();
                }
            })
            .then(function () {

                //send an email to the user to let them know their password has been changed
                mailer.sendPasswordChangedEmail(email);
                    res.redirect('/');
            })
            .catch(function (err) {
                console.log("Error: " + err);
            });
    }
}

//View all users page
exports.viewUsers = function (req, res) {
    user.findOne({
        email: req.session.email,
    }).then(function (viewer) {
        user.find({
            email: {$regex: ".*"}
        }).then(function (results) {
            res.render('user/viewUsers', {
                title: "View Users",
                heading: "View Users",
                users: results,
                viewer: viewer,
                email: req.session.email,
                hints: viewer.hints,
            });
        });
    });
}

//view either the page for making a user an admin, or revoking admin rights
exports.showAdminControl = function(req, res){
    var type = req.params.type;
    var alert = req.params.result;

    user.findOne({
        _id: req.params.user,
    }).then(function (result) {
        res.render('user/' + (type === "make"? 'makeAdmin'
                : (type === "revoke"? 'revokeAdmin' : 'viewUsers')), {
            title: (type === "make"? 'Make Admin'
                : (type === "revoke"? 'Revoke Admin' : 'View Users')),
            heading: (type === "make"? 'Make Admin'
                : (type === "revoke"? 'Revoke Admin' : 'View Users')),
            user: result._id,
            email: result.email,
            success: (alert === "1"),
            failed: (alert === "2"),
            wrongPassword: (alert === "3"),
        });
    });
}

//'flip' the admin setting of a user - switch it from true to false or vice versa
exports.flipAdmin = function (req, res) {
    var email = req.session.email;
    var password = req.body.adminPassword;

    //find the account to change the settings of
    var account;
    user.findOne({
        _id: req.params.user,
    }).then(function (result) {
        account = result;
        if (account) {

            //find the account of the admin trying to change the settings
            user.findOne({
                email: email,
            }).then(
                function (result) {
                    var hash = result.password;

                    //check the admin entered the correct password
                    if (hash && password &&
                        bcrypt.compareSync(password, hash)) {

                        //if the user entered the correct password, get the user and delete them
                        account.isAdmin = !(account.isAdmin);
                        account.save().then(function () {
                            res.redirect('/user/' + req.params.user + '/admin/' +
                                (account.isAdmin? 'revoke' : 'make') + '/1');
                        });
                    }
                    else {

                        //Show wrong password warning if the admin password didn't match
                        res.redirect('/user/' + req.params.user + '/admin/' +
                            (account.isAdmin? 'revoke' : 'make') + '/3');
                    }
                }
            )
        } else {

            //show an error message if the action couldn't be performed
            res.redirect('/user/' + req.params.user + '/admin/' +
                (account.isAdmin? 'revoke' : 'make') + '/2');
        }
    }).catch(
        function (error) {
            console.log("Error: " + error);
        });
}

//turn hints on or off
exports.toggleHints = function(req, res){

    user.findOne({
        email: req.session.email,
    }).then(function(result){
        if(req.session.hints){
            console.log("HINTS DISABLED");
            result.hints = false;
            req.session.hints = false;
        }
        else{
            console.log("HINTS ENABLED");
            result.hints = true;
            req.session.hints = true;
        }
        result.save();
    }).then(function(){
        res.redirect('/user/' + req.session.userID + '/viewProfile');
    }).catch(function(err){
        console.log("Error: " + err);
    });
}

//Logout
exports.logout = function (req, res) {

    delete req.session.authenticated;
    res.redirect('/');
};