var mongoose = require('mongoose');
var project = require('./project');
var changeItem = require('./changeItem');
var resource = require('./resource');
var globals = require('../globals');
var dburl = globals.dburl.toString();
mongoose.createConnection(dburl);

var Schema = mongoose.Schema;
var requiredResourceSchema = new Schema({
    roleName: String,
    pLine: String,
    company: String,
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

exports.view = function (req, res) {
    requiredResource.findOne({
        _id: req.params.resourceId
    }).populate('impact').then(function (requiredResource) {
        res.render('requiredResource/resource', {
            title: 'PartyParrot - ' + req.params.changeItem,
            heading: requiredResource.roleName + ' for ' + req.params.changeItem,
            projectCode: req.params.projectCode,
            changeItem: req.params.changeItem,
            requiredResource: requiredResource
        });
    });
};


exports.addResourceView = function (req, res) {
    res.render('changeItem/addResource', {
        title: 'PartyParrot - ' + req.params.changeItem,
        heading: 'Add Required resource to ' + req.params.changeItem,
        projectCode: req.params.projectCode,
        changeItem: req.params.changeItem
    });
};

exports.editResourceView = function (req, res) {
    requiredResource.findOne({
        _id: req.params.resourceId
    }).populate('impact').then(function (requiredResource) {
        res.render('requiredResource/editResource', {
            title: 'PartyParrot - ' + req.params.changeItem,
            heading: 'Edit Required resource for ' + req.params.changeItem,
            projectCode: req.params.projectCode,
            changeItem: req.params.changeItem,
            requiredResource: requiredResource
        });
    });
};

exports.editResource = function (req, res) {

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
    }, function (err, requiredResource) {
        if (err) {
            return res.send(500, {error: err});
        } else {
            res.body = {
                title: 'PartyParrot - ' + requiredResource.changeTitle,
                heading: changeItem.changeTitle,
                projectCode: req.params.projectCode,
                changeItem: req.params.changeItem,
                requiredResource: requiredResource
            };
            res.redirect('/project/' + req.params.projectCode + '/' + req.params.changeItem + '/' + req.params.resourceId);
        }
    });
};

exports.addResource = function (req, res) {

    var data = new requiredResource({
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
    res.redirect('/project/' + req.params.projectCode + '/' + req.params.changeItem);
};


exports.addImpact = function (resourceID, impactID) {
    requiredResource.findOne({
        _id: resourceID
    }).then(function (requiredResource) {
        requiredResource.impact.push(impactID);
        requiredResource.save();

    });
};

exports.delete = function (req, res) {

    requiredResource.findOneAndRemove({
        _id: req.params.resourceId
    }, function (err, doc) {
        res.redirect('/project/' + req.params.projectCode + '/' + req.params.changeItem);
    });
};


exports.assign = function (req, res) {

    console.log('hit');
    requiredResource.update({_id: req.params.reqResourceId}, {
        forecastedResource: req.params.resourceId
    }, function(err, affected, resp) {
        console.log(resp);
        res.redirect('/project/' + req.params.projectCode + '/' + req.params.changeItem);
    });
};



