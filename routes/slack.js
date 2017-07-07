var slack = require('slack-node');
var user = require('./user');
var messenger = new slack();

exports.sendSlackMessage = function(recipientEmail, messageText){

    user.userModel.findOne({
        email: recipientEmail
    }).then(function(result){
        console.log("Result: " + result);
        messenger.setWebhook(result.webhook);
        console.log("Set webhook");
        messenger.webhook({
            channel: result.slack,
            username: ":spades: AugaBot",
            text: messageText,
        }, function(err, response){
            console.log(response);
        })
        console.log("Sent webhook");
    }).catch(function(err){
        console.log("Error: " + err);
    })

}