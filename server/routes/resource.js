var mongoose = require('mongoose');
var changeItem = require('./changeItem');
var project = require('./project');
var moment = require('moment-business-days');
var globals = require('../globals');
var dburl = globals.dburl.toString();
mongoose.createConnection(dburl);

var Schema = mongoose.Schema;
var resourceSchema = new Schema({
    resourceName: {type: String, required: true},
    employeeId: String,
    location: String,
    email: String,
    role: String
}, {collection: 'resource'});

var resource = mongoose.model('resource', resourceSchema);


//Load the new project form
exports.viewNewResource = function (req, res) {
    res.render('resource/newResource', {title: 'ImpactCast - New Resource', heading: 'Create a new resource'});
};


//Submit the new team form
exports.newResource = function (req, callback) {

    //Add to database
    var data = new resource({
        resourceName: req.body.resourceName,
        employeeId: req.body.employeeId,
        location: req.body.location,
        email: req.body.email,
        role: req.body.role
    });
    data.save();

    callback(data._id);
};


//Load the project info page
exports.view = function (req, res) {

    var now = new Date();

    var month = [];
    var monthPlusOne = [];
    var monthPlusTwo = [];
    var monthPlusThree = [];
    var monthPlusFour = [];
    var monthPlusFive = [];
    var monthPlusSix = [];

    var currentMonthWorkingDays = moment('01-' + (now.getMonth()) + '-' + now.getFullYear(), 'DD-MM-YYYY').monthBusinessDays();
    var monthPlusOneWorkingDays = moment('01-' + (now.getMonth() + 1) + '-' + now.getFullYear(), 'DD-MM-YYYY').monthBusinessDays();
    var monthPlusTwoWorkingDays = moment('01-' + (now.getMonth() + 2) + '-' + now.getFullYear(), 'DD-MM-YYYY').monthBusinessDays();
    var monthPlusThreeWorkingDays = moment('01-' + (now.getMonth() + 3) + '-' + now.getFullYear(), 'DD-MM-YYYY').monthBusinessDays();
    var monthPlusFourWorkingDays = moment('01-' + (now.getMonth() + 4) + '-' + now.getFullYear(), 'DD-MM-YYYY').monthBusinessDays();
    var monthPlusFiveWorkingDays = moment('01-' + (now.getMonth() + 5) + '-' + now.getFullYear(), 'DD-MM-YYYY').monthBusinessDays();
    var monthPlusSixWorkingDays = moment('01-' + (now.getMonth() + 6) + '-' + now.getFullYear(), 'DD-MM-YYYY').monthBusinessDays();

    resource.findOne({
        _id: req.params.resourceId
    }).then(function (resource) {

        project.getProjectsByResourceImpactMonth(req.params.resourceId, new Date(now.getFullYear(), now.getMonth(), 1), new Date(now.getFullYear(), now.getMonth() + 1, 1), function (results) {
            month = results;
        });

        project.getProjectsByResourceImpactMonth(req.params.resourceId, new Date(now.getFullYear(), now.getMonth() + 1, 1), new Date(now.getFullYear(), now.getMonth() + 2, 1), function (results) {
            monthPlusOne = results;
        });

        project.getProjectsByResourceImpactMonth(req.params.resourceId, new Date(now.getFullYear(), now.getMonth() + 2, 1), new Date(now.getFullYear(), now.getMonth() + 3, 1), function (results) {
            monthPlusTwo = results;
        });

        project.getProjectsByResourceImpactMonth(req.params.resourceId, new Date(now.getFullYear(), now.getMonth() + 3, 1), new Date(now.getFullYear(), now.getMonth() + 4, 1), function (results) {
            monthPlusThree = results;
        });

        project.getProjectsByResourceImpactMonth(req.params.resourceId, new Date(now.getFullYear(), now.getMonth() + 4, 1), new Date(now.getFullYear(), now.getMonth() + 5, 1), function (results) {
            monthPlusFour = results;
        });

        project.getProjectsByResourceImpactMonth(req.params.resourceId, new Date(now.getFullYear(), now.getMonth() + 5, 1), new Date(now.getFullYear(), now.getMonth() + 6, 1), function (results) {
            monthPlusFive = results;
        });

        project.getProjectsByResourceImpactMonth(req.params.resourceId, new Date(now.getFullYear(), now.getMonth() + 6, 1), new Date(now.getFullYear(), now.getMonth() + 7, 1), function (results) {
            monthPlusSix = results;
        });

        res.send({
            result: {
                resource: resource,
                months: [month, monthPlusOne, monthPlusTwo, monthPlusThree, monthPlusFour, monthPlusFive, monthPlusSix],
                monthsWorkingDays: [currentMonthWorkingDays.length, monthPlusOneWorkingDays.length,
                    monthPlusTwoWorkingDays.length, monthPlusThreeWorkingDays.length, monthPlusFourWorkingDays.length,
                    monthPlusFiveWorkingDays.length, monthPlusSixWorkingDays.length]
            }
        })
    });

};


//Load the search form
exports.viewSearchResources = function (req, res) {
    res.render('resource/searchResources', {title: 'ImpactCast - Search Resources', heading: 'Search Resources'});
};


//Load the search results page
exports.searchResources = function (req, callback) {

    resource.find({
        resourceName: {$regex: '(?i).*' + req.query.resourceName + '.*'},
        employeeId: {$regex: '(?i).*' + req.query.employeeId + '.*'},
        location: {$regex: '(?i).*' + req.query.location + '.*'},
        email: {$regex: '(?i).*' + req.query.email + '.*'},
        role: {$regex: '(?i).*' + req.query.role + '.*'}
    }).then(callback)
};

//
//Update project Info
exports.viewUpdate = function (req, res) {

    resource.findOne({
        _id: req.params.resourceId
    }).then(function (resource) {
        res.render('resource/editResource', {
            title: 'ImpactCast - ' + resource.resourceName,
            heading: 'Update ' + resource.resourceName,
            resource: resource
        });
    })
};

//Run update query
exports.update = function (req, callback) {


    var newData = {
        resourceName: req.body.resourceName,
        employeeId: req.body.employeeId,
        location: req.body.location,
        email: req.body.email,
        role: req.body.role,
    };

    resource.findOneAndUpdate({_id: req.params.resourceId}, newData, {
        upsert: false,
        new: false
    }).then(callback);
};


//delete the project
exports.delete = function (req, callback) {

    resource.findOneAndRemove({
        _id: req.params.resourceId
    }).then(callback);
};


//Load the search form
exports.viewFindResource = function (req, res) {
    res.render('resource/forecastResourceSearch', {
        title: 'ImpactCast - Assign a resource',
        heading: 'Find a resource for ' + req.params.changeItem,
        projectCode: req.params.projectCode,
        changeItem: req.params.changeItem,
        requiredResource: req.params.resourceId
    });
};

//Load the search results page
exports.findResource = function (req, res) {

    resource.find({
        resourceName: {$regex: '(?i).*' + req.body.resourceName + '.*'},
        employeeId: {$regex: '(?i).*' + req.body.employeeId + '.*'},
        location: {$regex: '(?i).*' + req.body.location + '.*'},
        email: {$regex: '(?i).*' + req.body.email + '.*'},
        role: {$regex: '(?i).*' + req.body.role + '.*'}
    }).then(function (results) {
        res.render('resource/forecastResourceSearchResults', {
            title: 'ImpactCast - Assign a resource',
            heading: 'Find a resource for ' + req.params.changeItem,
            projectCode: req.params.projectCode,
            changeItem: req.params.changeItem,
            requiredResource: req.params.resourceId,
            resources: results
        });
    })
};


//Load the search form
exports.viewFindTeamMember = function (req, res) {
    res.render('resource/addTeamMemberResourceSearch', {
        title: 'ImpactCast - Add a TeamPage Member',
        heading: 'Find a resource to add to ' + req.params.teamName,
        teamName: req.params.teamName
    });
};


//Load the search results page
exports.findTeamMember = function (req, res) {

    resource.find({
        resourceName: {$regex: '(?i).*' + req.body.resourceName + '.*'},
        employeeId: {$regex: '(?i).*' + req.body.employeeId + '.*'},
        location: {$regex: '(?i).*' + req.body.location + '.*'},
        email: {$regex: '(?i).*' + req.body.email + '.*'},
        role: {$regex: '(?i).*' + req.body.role + '.*'}
    }).then(function (results) {
        res.render('resource/addTeamMemberResourceSearchResults', {
            title: 'ImpactCast - Add a TeamPage Member',
            heading: 'Find a resource to add to ' + req.params.teamName,
            teamName: req.params.teamName,
            resources: results
        });
    })
};

