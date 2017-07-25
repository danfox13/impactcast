var async = require('async');
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

mongoose.Promise = Promise;

//Load the new project form
exports.newTeam = function (req, res) {
    res.render('team/newTeam', {title: 'ImpactCast - New TeamPage', heading: 'Create a new team'});
};


//Submit the new team form
exports.addNewTeam = function (teamName, callback) {

    var data = new team({
        teamName: teamName
    });
    data.save();

    callback();
};

async function getResourceMonthDeltas(teamMember) {
    let today = new Date(),
        months = [],
        workingDays = [];

    for (let index = 0; index < 7; index++) {
        workingDays.push(moment('01-' + (today.getMonth() + index) + '-' + today.getFullYear(), 'DD-MM-YYYY').monthBusinessDays().length);
        months.push(new Promise(resolve => {
            project.getProjectsByResourceImpactMonth(teamMember._id,
                new Date(today.getFullYear(), today.getMonth() + index, 1),
                new Date(today.getFullYear(), today.getMonth() + index + 1, 1), resolve)
        }));
    }

    return await Promise.all(months).then(results => {
        let monthDeltas = [];

        results.forEach((month, index) => {
            let totalDays = 0;

            month.forEach(project => {
                project.changeItems.forEach(changeItem => {
                    totalDays += changeItem.resourcesRequired.impact.days
                })
            });

            monthDeltas.push(totalDays - workingDays[index]);

        });

        return {
            resourceId: teamMember._id,
            name: teamMember.resourceName,
            monthDeltas: monthDeltas
        }
    })
}

//Load the team info page
exports.view = function (teamName, callback) {
    team.findOne({
        teamName: teamName
    }).populate('teamMembers')
        .then(team => {
            async.map(team.teamMembers, getResourceMonthDeltas, (_, results) => {
                let result = {
                    team: team,
                    teamForecast: results
                };

                callback(result)
            })
        });
};

//Update project Info
exports.viewUpdate = function (req, res) {

    team.findOne({
        teamName: req.params.teamName
    }).then(function (team) {
        res.render('team/editTeam', {
            title: 'ImpactCast - ' + team.teamName,
            heading: 'Update ' + team.teamName,
            team: team
        });
    })
};

//Run update query
exports.update = function (req, callback) {

    let newData = {
        teamName: req.body.teamName
    };

    team.findOneAndUpdate({teamName: req.params.teamName}, newData, {
        upsert: false,
        new: false
    }).then(callback);
};

//delete the project
exports.delete = function (req, callback) {

    team.findOneAndRemove({
        teamName: req.params.teamName
    }).then(callback);

};


//Load the search form
exports.viewSearchTeams = function (req, res) {
    res.render('team/searchTeams', {title: 'ImpactCast - Search TeamPage', heading: 'Search Teams'});
};

//Load the search results page
exports.searchTeams = function (teamName, resourceName, callback) {

    team.find({
        teamName: {$regex: `(?i).*${teamName}.*`}
    }).populate({
        path: 'teamMembers',
        model: 'resource',
        select: 'resourceName'
    }).then(teams => {
        const resourceNamePattern = new RegExp(`.*${resourceName}.*`, 'i');
        let results = resourceName.length ? teams.filter(team => team.teamMembers.some(resource =>
            resourceNamePattern.test(resource.resourceName))) : teams;

        callback(results);
    }).catch(console.log)
};


//add a resource to the team
exports.addTeamMember = function (req, callback) {
    team.findOne({
        teamName: req.params.teamName
    }).then(function (team) {
        team.teamMembers.push(req.params.resourceId);
        team.save();

        callback();
    })
};


//remove a resource
exports.removeTeamMember = function (req, callback) {
    team.update(
        {teamName: req.params.teamName},
        {$pull: {'teamMembers': mongoose.mongo.ObjectID(req.params.resourceId)}})
        .then(callback)
};
