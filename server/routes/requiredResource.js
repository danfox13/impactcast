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

exports.removeImpact = (resourceID, impactID) => {
    requiredResource.findOne({
        _id: resourceID
    }).then(function (requiredResource) {
        requiredResource.impact = requiredResource.impact.filter(impact => {return !impact.equals(impactID)});
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



