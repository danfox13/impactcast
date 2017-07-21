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
    resource.findOne({
        _id: req.params.resourceId
    }).then(resource => {
            let today = new Date(),
                months = [],
                workingDays = [];

            for (let index = 0; index < 7; index++) {
                workingDays.push(moment('01-' + (today.getMonth() + index) + '-' + today.getFullYear(), 'DD-MM-YYYY').monthBusinessDays().length);
                months.push(new Promise(resolve => {
                    project.getProjectsByResourceImpactMonth(req.params.resourceId,
                        new Date(today.getFullYear(), today.getMonth() + index, 1),
                        new Date(today.getFullYear(), today.getMonth() + index + 1, 1), resolve)
                }));
            }

            Promise.all(months).then(results =>
                res.send({
                    result: {
                        resource: resource,
                        months: results,
                        workingDays: workingDays
                    }
                })
            );
        }
    );

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


