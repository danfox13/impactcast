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

const resource = mongoose.model('resource', resourceSchema);


//Submit the new team form
exports.newResource = function (req, callback) {

    //Add to database
    const data = new resource({
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
                workingDays.push(moment('01-' + (today.getMonth() + index) + '-' + today.getFullYear(),
                    'DD-MM-YYYY').monthBusinessDays().length);
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


//Load the search results page
exports.searchResources = function (req, callback) {

    resource.find({
        resourceName: {$regex: `(?i).*${req.query.resourceName}.*`},
        employeeId: {$regex: `(?i).*${req.query.employeeId}.*`},
        location: {$regex: `(?i).*${req.query.location}.*`},
        email: {$regex: `(?i).*${req.query.email}.*`},
        role: {$regex: `(?i).*${req.query.role}.*`}
    }).then(callback)
};

//Run update query
exports.update = function (req, callback) {

    const newData = {
        resourceName: req.body.resourceName,
        employeeId: req.body.employeeId,
        location: req.body.location,
        email: req.body.email,
        role: req.body.role
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

