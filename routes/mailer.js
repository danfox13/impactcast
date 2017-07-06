var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'augaapp@gmail.com',
        pass: 'impactcast'
    }
});

exports.sendEmail = function(recipient, password){
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

module.exports = exports;