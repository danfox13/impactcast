var mongoose = require('mongoose');
var project = require('./project');
var changeItem = require('./changeItem');
var resource = require('./resource');
var globals = require('../globals');
var dburl = globals.dburl.toString();
mongoose.createConnection(dburl);

var Schema = mongoose.Schema;
var requiredResourceSchema = new Schema({
    roleName: {type: String, required: true},
    pLine: {type: String, required: true},
    company: {type: String, required: true},
    resourceType: String,
    grade: String,
    stage: String,
    jobCode: String,
    system: String,
    component: String,
    pricingFlag: String,
    reason: String,
    impact: [{type: Schema.Types.ObjectId, ref: 'impact'}],
    forecastedResource: {type: Schema.Types.ObjectId, ref: 'resource'}

}, {collection: 'requiredResource'});


var requiredResource = mongoose.model('requiredResource', requiredResourceSchema);

//load the required resource page
exports.view = function (req, callback) {
    requiredResource.findOne({
        _id: req.params.resourceId
    }).populate('impact').then(callback);
};


//load the add required resource form
exports.addResourceView = function (req, res) {
    res.render('changeItem/addResource', {
        title: 'ImpactCast - ' + req.params.changeItem,
        heading: 'Add Required resource to ' + req.params.changeItem,
        projectCode: req.params.projectCode,
        changeItem: req.params.changeItem
    });
};


//load the edit resource view
exports.editResourceView = function (req, res) {
    requiredResource.findOne({
        _id: req.params.resourceId
    }).populate('impact').then(function (requiredResource) {
        res.render('requiredResource/editResource', {
            title: 'ImpactCast - ' + req.params.changeItem,
            heading: 'Edit Required resource for ' + req.params.changeItem,
            projectCode: req.params.projectCode,
            changeItem: req.params.changeItem,
            requiredResource: requiredResource
        });
    });
};


//edit resource
exports.editResource = function (req, callback) {

    var newData = {
        roleName: req.body.roleName,
        pLine: req.body.pLine,
        company: req.body.company,
        resourceType: req.body.resourceType,
        grade: req.body.grade,
        stage: req.body.stage,
        jobCode: req.body.jobCode,
        system: req.body.system,
        component: req.body.component,
        pricingFlag: req.body.pricingFlag,
        reason: req.body.reason
    };

    requiredResource.findOneAndUpdate({_id: req.params.resourceId}, newData, {
        upsert: false,
        new: false
    }).then(callback);
};

//add a resource requirement
exports.addResource = function (req, callback) {

    let data = new requiredResource({
        roleName: req.body.roleName,
        pLine: req.body.pLine,
        company: req.body.company,
        resourceType: req.body.resourceType,
        grade: req.body.grade,
        stage: req.body.stage,
        jobCode: req.body.jobCode,
        system: req.body.system,
        component: req.body.component,
        pricingFlag: req.body.pricingFlag,
        reason: req.body.reason
    });

    data.save();
    changeItem.addRequiredResource(req.params.changeItem, data._id);
    callback(data.roleName);
};


//add an impact
exports.addImpact = function (resourceID, impactID) {
    requiredResource.findOne({
        _id: resourceID
    }).then(function (requiredResource) {
        requiredResource.impact.push(impactID);
        requiredResource.save();

    });
};


//delete a resource requirement
exports.delete = function (req, callback) {

    requiredResource.findOneAndRemove({
        _id: req.params.resourceId
    }).then(callback);
};


//assign a resource to a resource requirement
exports.assign = function (req, callback) {

    requiredResource.update({_id: req.params.reqResourceId}, {
        forecastedResource: req.params.resourceId
    }).then(callback);
};



