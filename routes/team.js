var mongoose = require('mongoose');
var changeItem = require('./changeItem');
var project = require('./project');
var moment = require('moment-business-days');
var globals = require('../globals');
var dburl = globals.dburl.toString();
mongoose.connect(dburl);

var Schema = mongoose.Schema;
var teamSchema = new Schema({
    teamName: {type: String, required: true},
    teamMembers: [{type: Schema.Types.ObjectId, ref: 'resource'}]
}, {collection: 'team'});

var team = mongoose.model('team', teamSchema);

// exports.addChangeItem = function(projectCode, changeItemID){
//     project.findOne({
//         projectCode: projectCode
//     }).then(function (project) {
//         project.changeItems.push(changeItemID);
//         project.save();
//     })
// };

//Load the new project form
exports.newTeam = function (req, res) {
    res.render('team/newTeam', {title: 'ImpactCast - New Team', heading: 'Create a new team'});
};


//Submit the new team form
exports.addNewTeam = function (req, res) {

    //Add to database
    var data = new team({
        teamName: req.body.teamName
    });
    data.save();

    res.redirect('/team/' + req.body.teamName);
};


//Load the project info page
exports.view = function (req, res) {

    var teamForecast = [];
    var now = new Date();


    team.findOne({
        teamName: req.params.teamName
    }).populate('teamMembers').then(function (team) {

        team.teamMembers.forEach(function (teamMember) {

            var month = [];
            var monthPlusOne = [];
            var monthPlusTwo = [];
            var monthPlusThree = [];
            var monthPlusFour = [];
            var monthPlusFive = [];
            var monthPlusSix = [];

            var currentMonthWorkingDays = moment('01-' + (now.getMonth() + 1) + '-' + now.getFullYear(), 'DD-MM-YYYY').monthBusinessDays().length;
            var monthPlusOneWorkingDays = moment('01-' + (now.getMonth() + 2) + '-' + now.getFullYear(), 'DD-MM-YYYY').monthBusinessDays().length;
            var monthPlusTwoWorkingDays = moment('01-' + (now.getMonth() + 3) + '-' + now.getFullYear(), 'DD-MM-YYYY').monthBusinessDays().length;
            var monthPlusThreeWorkingDays = moment('01-' + (now.getMonth() + 4) + '-' + now.getFullYear(), 'DD-MM-YYYY').monthBusinessDays().length;
            var monthPlusFourWorkingDays = moment('01-' + (now.getMonth() + 5) + '-' + now.getFullYear(), 'DD-MM-YYYY').monthBusinessDays().length;
            var monthPlusFiveWorkingDays = moment('01-' + (now.getMonth() + 6) + '-' + now.getFullYear(), 'DD-MM-YYYY').monthBusinessDays().length;
            var monthPlusSixWorkingDays = moment('01-' + (now.getMonth() + 7) + '-' + now.getFullYear(), 'DD-MM-YYYY').monthBusinessDays().length;

            project.getProjectsByResourceImpactMonth(teamMember._id, new Date(now.getFullYear(), now.getMonth(), 1), new Date(now.getFullYear(), now.getMonth() + 1, 1), function (results) {
                month = results;
            });

            project.getProjectsByResourceImpactMonth(teamMember._id, new Date(now.getFullYear(), now.getMonth() + 1, 1), new Date(now.getFullYear(), now.getMonth() + 2, 1), function (results) {
                monthPlusOne = results;
            });

            project.getProjectsByResourceImpactMonth(teamMember._id, new Date(now.getFullYear(), now.getMonth() + 2, 1), new Date(now.getFullYear(), now.getMonth() + 3, 1), function (results) {
                monthPlusTwo = results;
            });

            project.getProjectsByResourceImpactMonth(teamMember._id, new Date(now.getFullYear(), now.getMonth() + 3, 1), new Date(now.getFullYear(), now.getMonth() + 4, 1), function (results) {
                monthPlusThree = results;
            });

            project.getProjectsByResourceImpactMonth(teamMember._id, new Date(now.getFullYear(), now.getMonth() + 4, 1), new Date(now.getFullYear(), now.getMonth() + 5, 1), function (results) {
                monthPlusFour = results;
            });

            project.getProjectsByResourceImpactMonth(teamMember._id, new Date(now.getFullYear(), now.getMonth() + 5, 1), new Date(now.getFullYear(), now.getMonth() + 6, 1), function (results) {
                monthPlusFive = results;
            });

            project.getProjectsByResourceImpactMonth(teamMember._id, new Date(now.getFullYear(), now.getMonth() + 6, 1), new Date(now.getFullYear(), now.getMonth() + 7, 1), function (results) {
                monthPlusSix = results;
            });

            setTimeout(function () {

                var monthCount = 0;
                month.forEach(function (project) {
                    project.changeItems.forEach(function (changeItem) {
                        monthCount += changeItem.resourcesRequired.impact.days
                    })
                });
                var monthDelta = monthCount - currentMonthWorkingDays;


                var monthP1Count = 0;
                monthPlusOne.forEach(function (project) {
                    project.changeItems.forEach(function (changeItem) {
                        monthP1Count += changeItem.resourcesRequired.impact.days
                    })
                });
                var monthP1Delta = monthP1Count - monthPlusOneWorkingDays;


                var monthP2Count = 0;
                monthPlusTwo.forEach(function (project) {
                    project.changeItems.forEach(function (changeItem) {
                        monthP2Count += changeItem.resourcesRequired.impact.days
                    })
                });
                var monthP2Delta = monthP2Count - monthPlusTwoWorkingDays;


                var monthP3Count = 0;
                monthPlusThree.forEach(function (project) {
                    project.changeItems.forEach(function (changeItem) {
                        monthP3Count += changeItem.resourcesRequired.impact.days
                    })
                });
                var monthP3Delta = monthP3Count - monthPlusThreeWorkingDays;


                var monthP4Count = 0;
                monthPlusFour.forEach(function (project) {
                    project.changeItems.forEach(function (changeItem) {
                        monthP4Count += changeItem.resourcesRequired.impact.days
                    })
                });
                var monthP4Delta = monthP4Count - monthPlusFourWorkingDays;


                var monthP5Count = 0;
                monthPlusFive.forEach(function (project) {
                    project.changeItems.forEach(function (changeItem) {
                        monthP5Count += changeItem.resourcesRequired.impact.days
                    })
                });
                var monthP5Delta = monthP5Count - monthPlusFiveWorkingDays;


                var monthP6Count = 0;
                monthPlusSix.forEach(function (project) {
                    project.changeItems.forEach(function (changeItem) {
                        monthP6Count += changeItem.resourcesRequired.impact.days
                    })
                });
                var monthP6Delta = monthP6Count - monthPlusSixWorkingDays;

                teamForecast.push({
                    resourceId: teamMember._id,
                    name: teamMember.resourceName,
                    currentMonth: monthDelta,
                    monthPlusOne: monthP1Delta,
                    monthPlusTwo: monthP2Delta,
                    monthPlusThree: monthP3Delta,
                    monthPlusFour: monthP4Delta,
                    monthPlusFive: monthP5Delta,
                    monthPlusSix: monthP6Delta
                });
            }, 1000);

        });


        setTimeout(function () {
            console.log(teamForecast);
            res.render('team/team', {
                title: 'ImpactCast - ' + team.teamName,
                heading: team.teamName,
                team: team,
                teamForecast: teamForecast
            });
        }, 2000);
    })
};

//Update project Info
exports.viewUpdate = function (req, res) {

    //TODO project.find().populate(changeItems).then(function(results) {
    team.findOne({
        teamName: req.params.teamName
    }).then(function (team) {
        res.render('team/editTeam', {
            title: 'ImpactCast - ' + team.teamName,
            heading: "Update " + team.teamName,
            team: team
        });
        console.log(team);
    })
};

//Run update query
exports.update = function (req, res) {

    var newData = {
        teamName: req.body.teamName
    };

    team.findOneAndUpdate({teamName: req.params.teamName}, newData, {
        upsert: false,
        new: false
    }, function (err, team) {
        if (err) {
            return res.send(500, {error: err});
        } else {

            res.redirect('/team/' + req.body.teamName);
        }
    });
};

//delete the project
exports.delete = function (req, res) {

    //TODO error handling
    team.findOneAndRemove({
        teamName: req.params.teamName
    }, function (err, doc) {
        res.redirect('/');
    });

};


//Load the search form
exports.viewSearchTeams = function (req, res) {
    res.render('team/searchTeams', {title: 'ImpactCast - Search Team', heading: 'Search Teams'});
};

//Load the search results page
exports.searchTeams = function (req, res) {

    team.aggregate([
        {$unwind: "$teamMembers"},
        {
            $lookup: {
                from: "resource",
                localField: "teamMembers",
                foreignField: "_id",
                as: "teamMembers"
            }
        },
        {$unwind: "$teamMembers"},
        {
            $match: {
                "teamMembers.resourceName": {$regex: "(?i).*" + req.body.resourceName + ".*"},
                teamName: {$regex: "(?i).*" + req.body.teamName + ".*"}
            }
        },
        {
            $group: {
                _id: "$_id",
                teamName: {"$first": "$teamName"},
                teamMembers: {"$push": "$teamMembers"}
            }
        }

    ]).then(function (results) {
        res.render('team/searchTeamsResults', {
            title: 'ImpactCast - Search Results',
            heading: 'Search Results',
            teams: results
        });
    })
};


exports.addTeamMember = function (req, res) {
    team.findOne({
        teamName: req.params.teamName
    }).then(function (team) {
        team.teamMembers.push(req.params.resourceId);
        team.save();
        res.redirect('/team/' + req.params.teamName);
    })
};


exports.removeTeamMember = function (req, res) {
    team.update({teamName: req.params.teamName}, {$pull: {'teamMembers': mongoose.mongo.ObjectID(req.params.resourceId)}}
    ).then(function (team) {
        res.redirect('/team/' + req.params.teamName);
    }, function (err) {
        if (err) {
            res.json(500, {message: "Could not remove user from team list"});
        }
    })

};
