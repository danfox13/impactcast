var slack = require('slack-node');
var user = require('./user');
var messenger = new slack();

//webhook for teams's general channel TODO make this applicable to other teams?
messenger.setWebhook("https://hooks.slack.com/services/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");


//Send a slack message to an individual's slackbot channel
exports.individualMessage = function (recipientEmail, messageText) {

    //get the details of the user with the recipient email
    user.userModel.findOne({
        email: recipientEmail
    }).then(function (result) {

        if (result) {

            //send a message to them via slack
            messenger.webhook({
                channel: "@owenjenkins",
                username: "Auga Bot",
                icon_emoji: ":spades:",
                text: "Hi " + result.name + ", here's a new message:\n>>>" + messageText,
            }, function (err, response) {
                if (err) {
                    console.log("Error: " + err);
                }
            })
        }
    }).catch(function (err) {
        console.log("Error: " + err);
    })

}

//Send a slack message to the #general channel
exports.generalMessage = function (messageText) {

    //send a message to the slack #general channel
    messenger.webhook({
        channel: "#general",
        username: "Auga Bot",
        icon_emoji: ":spades:",
        text: "Hi everyone, here's some info:\n>>>" + messageText,
    }, function (err, response) {
        if (err) {
            console.log("Error: " + err);
        }
    });
}