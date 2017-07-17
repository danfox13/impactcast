var nodemailer = require('nodemailer');

//create transporter to use for sending emails
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'augaapp@gmail.com',
        pass: 'impactcast'
    }
});

//send an email to let the user know they've been added with their login details
exports.sendAddUserEmail = function (recipient, password) {
    var mailOptions = {
        from: 'augaapp@gmail.com',
        to: recipient,
        subject: 'Welcome to Auga!',
        text: 'Welcome to the Auga Impacting and Forecasting Platform.' +
        '\n\nHere is your current login information - please use this to login and then ' +
        'change your password immediately to one only you know.' +
        '\n\nEmail: ' + recipient +
        '\nPassword: ' + password +
        '\n\nThis message has been auto-generated, please do not reply.'
    };

    transporter.sendMail(mailOptions, function (error, info) {

        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

//send an email to give the user a password reset link
exports.sendResetEmail = function (recipient, token) {
    console.log("Making email");
    var mailOptions = {
        from: 'augaapp@gmail.com',
        to: recipient,
        subject: 'Password Reset Link!',
        text: 'Your account has requested a reset link for your password.' +
        '\n\nHere is your password reset link. If you did not request to change your password, ' +
        'please contact us immediately.' +
        '\n\nReset Link: ' + "http://" + req.host + "/reset/" + token +
        '\n\nThis link will expire in 1 hour.',
    };

    console.log("Made email including " + token + " for " + recipient);
    transporter.sendMail(mailOptions, function (error, info) {

        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    console.log("Sent email");
}


//send an email to let the user know their password has been changed
exports.sendPasswordChangedEmail = function (recipient) {
    var mailOptions = {
        from: 'augaapp@gmail.com',
        to: recipient,
        subject: 'Your Auga password has been changed!',
        text: 'Someone has changed the password used to access your account.' +
        '\n\nIf this was not you, please contact us immediately.'
    };

    transporter.sendMail(mailOptions, function (error, info) {

        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


//send an email to let the user know their account has been deleted (removed from the DB)
exports.sendAccountDeletedEmail = function (recipient) {
    var mailOptions = {
        from: 'augaapp@gmail.com',
        to: recipient,
        subject: 'Your Auga account has been deleted!',
        text: 'Someone has removed your Auga account from our database.' +
        '\n\nIf you were not expecting this, please contact us immediately.'
    };

    transporter.sendMail(mailOptions, function (error, info) {

        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}