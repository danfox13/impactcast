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
exports.newResource = function (req, res) {

    //Add to database
    var data = new resource({
        resourceName: req.body.resourceName,
        employeeId: req.body.employeeId,
        location: req.body.location,
        email: req.body.email,
        role: req.body.role
    });
    data.save();

    res.redirect('/resource/' + data._id);
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

    var currentMonthWorkingDays = moment('01-' + (now.getMonth()+1) + '-' + now.getFullYear(), 'DD-MM-YYYY').monthBusinessDays();
    var monthPlusOneWorkingDays = moment('01-' + (now.getMonth()+2) + '-' + now.getFullYear(), 'DD-MM-YYYY').monthBusinessDays();
    var monthPlusTwoWorkingDays = moment('01-' + (now.getMonth()+3) + '-' + now.getFullYear(), 'DD-MM-YYYY').monthBusinessDays();
    var monthPlusThreeWorkingDays = moment('01-' + (now.getMonth()+4) + '-' + now.getFullYear(), 'DD-MM-YYYY').monthBusinessDays();
    var monthPlusFourWorkingDays = moment('01-' + (now.getMonth()+5) + '-' + now.getFullYear(), 'DD-MM-YYYY').monthBusinessDays();
    var monthPlusFiveWorkingDays = moment('01-' + (now.getMonth()+6) + '-' + now.getFullYear(), 'DD-MM-YYYY').monthBusinessDays();
    var monthPlusSixWorkingDays = moment('01-' + (now.getMonth()+7) + '-' + now.getFullYear(), 'DD-MM-YYYY').monthBusinessDays();

    resource.findOne({
        _id: req.params.resourceId
    }).then(function (resource) {

        project.getProjectsByResourceImpactMonth(req.params.resourceId, new Date(now.getFullYear(), now.getMonth(), 1), new Date(now.getFullYear(), now.getMonth() + 1, 1),  function(results){
            month = results;
        });

        project.getProjectsByResourceImpactMonth(req.params.resourceId, new Date(now.getFullYear(), now.getMonth() + 1, 1), new Date(now.getFullYear(), now.getMonth() + 2, 1),  function(results){
            monthPlusOne = results;
        });

        project.getProjectsByResourceImpactMonth(req.params.resourceId, new Date(now.getFullYear(), now.getMonth() + 2, 1), new Date(now.getFullYear(), now.getMonth() + 3, 1),  function(results){
            monthPlusTwo = results;
        });

        project.getProjectsByResourceImpactMonth(req.params.resourceId, new Date(now.getFullYear(), now.getMonth() + 3, 1), new Date(now.getFullYear(), now.getMonth() + 4, 1),  function(results){
            monthPlusThree = results;
        });

        project.getProjectsByResourceImpactMonth(req.params.resourceId, new Date(now.getFullYear(), now.getMonth() + 4, 1), new Date(now.getFullYear(), now.getMonth() + 5, 1),  function(results){
            monthPlusFour = results;
        });

        project.getProjectsByResourceImpactMonth(req.params.resourceId, new Date(now.getFullYear(), now.getMonth() + 5, 1), new Date(now.getFullYear(), now.getMonth() + 6, 1),  function(results){
            monthPlusFive = results;
        });

        project.getProjectsByResourceImpactMonth(req.params.resourceId, new Date(now.getFullYear(), now.getMonth() + 6, 1), new Date(now.getFullYear(), now.getMonth() + 7, 1),  function(results){
            monthPlusSix = results;
        });

        setTimeout(function() {


            res.render('resource/resource', {
                title: 'ImpactCast - ' + resource.resourceName,
                heading: resource.resourceName,
                resource: resource,
                currentMonth: month,
                monthPlusOne : monthPlusOne,
                monthPlusTwo : monthPlusTwo,
                monthPlusThree : monthPlusThree,
                monthPlusFour : monthPlusFour,
                monthPlusFive : monthPlusFive,
                monthPlusSix : monthPlusSix,
                currentMonthWorkingDays: currentMonthWorkingDays.length,
                monthPlusOneWorkingDays : monthPlusOneWorkingDays.length,
                monthPlusTwoWorkingDays : monthPlusTwoWorkingDays.length,
                monthPlusThreeWorkingDays : monthPlusThreeWorkingDays.length,
                monthPlusFourWorkingDays : monthPlusFourWorkingDays.length,
                monthPlusFiveWorkingDays : monthPlusFiveWorkingDays.length,
                monthPlusSixWorkingDays : monthPlusSixWorkingDays.length,

            });
        }, 1000);

    });

};



//Load the search form
exports.viewSearchResources = function (req, res) {
    res.render('resource/searchResources', {title: 'ImpactCast - Search Resources', heading: 'Search Resources'});
};




//Load the search results page
exports.searchResources = function (req, res) {

    resource.find({
        resourceName: {$regex: "(?i).*" + req.body.resourceName + ".*"},
        employeeId: {$regex: "(?i).*" + req.body.employeeId + ".*"},
        location: {$regex: "(?i).*" + req.body.location + ".*"},
        email: {$regex: "(?i).*" + req.body.email + ".*"},
        role: {$regex: "(?i).*" + req.body.role + ".*"}
    }).then(function (results) {
        res.render('resource/searchResourcesResults', {
            title: 'ImpactCast - Search Results',
            heading: 'Search Results',
            resources: results
        });
    });
};

//
//Update project Info
exports.viewUpdate = function (req, res) {

    resource.findOne({
        _id: req.params.resourceId
    }).then(function (resource) {
        res.render('resource/editResource', {
            title: 'ImpactCast - ' + resource.resourceName,
            heading: "Update " + resource.resourceName,
            resource: resource
        });
    })
};

//Run update query
exports.update = function (req, res) {


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
    }, function (err, resource) {
        if (err) {
            return res.send(500, {error: err});
        } else {

            res.redirect('/resource/' + req.params.resourceId);
        }
    });
};


//delete the project
exports.delete = function (req, res) {

    resource.findOneAndRemove({
        _id: req.params.resourceId
    }, function (err, doc) {
        res.redirect('/');
    });
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
        resourceName: {$regex: "(?i).*" + req.body.resourceName + ".*"},
        employeeId: {$regex: "(?i).*" + req.body.employeeId + ".*"},
        location: {$regex: "(?i).*" + req.body.location + ".*"},
        email: {$regex: "(?i).*" + req.body.email + ".*"},
        role: {$regex: "(?i).*" + req.body.role + ".*"}
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
        title: 'ImpactCast - Add a Team Member',
        heading: 'Find a resource to add to ' + req.params.teamName,
        teamName: req.params.teamName
    });
};


//Load the search results page
exports.findTeamMember = function (req, res) {

    resource.find({
        resourceName: {$regex: "(?i).*" + req.body.resourceName + ".*"},
        employeeId: {$regex: "(?i).*" + req.body.employeeId + ".*"},
        location: {$regex: "(?i).*" + req.body.location + ".*"},
        email: {$regex: "(?i).*" + req.body.email + ".*"},
        role: {$regex: "(?i).*" + req.body.role + ".*"}
    }).then(function (results) {
        res.render('resource/addTeamMemberResourceSearchResults', {
            title: 'ImpactCast - Add a Team Member',
            heading: 'Find a resource to add to ' + req.params.teamName,
            teamName: req.params.teamName,
            resources: results
        });
    })
};


