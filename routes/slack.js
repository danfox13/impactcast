var slack = require('slack-node');
var user = require('./user');
var messenger = new slack();

exports.sendSlackMessage = function(recipientEmail, messageText){

    user.userModel.findOne({
        email: recipientEmail
    }).then(function(result){
        console.log("Result: " + result);
        messenger.setWebhook(result.webhook);
        messenger.setWebhook("https://hooks.slack.com/services/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");
        console.log("Set webhook");
        messenger.webhook({
            channel: "@rosie.butcher",
            username: "Auga Bot",
            icon_emoji: ":spades:",
            text: "Hi " + result.name + ", here's a new message:\n>>>" + messageText,
        }, function(err, response){
            console.log(response);
        })
        console.log("Sent webhook");
    }).catch(function(err){
        console.log("Error: " + err);
    })

}