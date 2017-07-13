var mongoose = require('mongoose');
var project = require('./project');
var globals = require('../globals');
var dburl = globals.dburl.toString();
mongoose.createConnection(dburl);

var Schema = mongoose.Schema;
var changeItemSchema = new Schema({
    changeTitle: {type: String, required: true},
    status: String,
    lid: Date,
    startDate: Date,
    endDate: Date,
    risks: String,
    assumptions: String,
    resourcesRequired: [{type: Schema.Types.ObjectId, ref: 'requiredResource'}]
}, {collection: 'changeItem'});

var changeItem = mongoose.model('changeItem', changeItemSchema);

//Add a required resource
exports.addRequiredResource = function(changeTitle, requiredResourceID){
    changeItem.findOne({
        changeTitle: changeTitle
    }).then(function (changeItem) {
        changeItem.resourcesRequired.push(requiredResourceID);
        changeItem.save();
    })
};


//Load the new changeItem form
exports.newChangeItem = function (req, res) {
    res.render('changeItem/newChangeItem', {
        title: 'ImpactCast - New Change Item',
        heading: 'Add a new Change Item to ' + req.params.projectCode,
        projectCode: req.params.projectCode
    });
};


//Submit the new project form
exports.addChangeItem = function (req, callback) {

    var data = new changeItem({
        changeTitle: req.body.changeTitle,
        status: req.body.status,
        lid: req.body.lid,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        risks: req.body.risks,
        assumptions: req.body.assumptions,
    });

    data.save();
    project.addChangeItem(req.params.projectCode, data._id);

    callback(req.body.changeTitle);
};


//Load the changeitem info page
exports.view = function (req, callback) {

    changeItem.findOne({
        changeTitle: req.params.changeItem
    }).populate('resourcesRequired').populate({
        path: 'resourcesRequired',
        model: 'requiredResource',
        populate: [{
            path: 'resourcesRequired.impact',
            model: 'impact'
        }],
        populate: {
            path: 'forecastedResource',
            model: 'resource'
        }
    }).then(function (changeItem) {

        changeItem.resourcesRequired.forEach(function(resource){
            let dayCount = 0;
            resource.impact.forEach(function (monthlyImpact) {
                dayCount = parseInt(dayCount) + parseInt(monthlyImpact.days);
            });
            resource.totalManDays = dayCount;
        });

        callback(changeItem)
    })
};


//Update project Info
exports.viewUpdate = function (req, res) {

    changeItem.findOne({
        changeTitle: req.params.changeItem
    }).populate('resourcesRequired').then(function (changeItem) {
        res.render('changeItem/updateChangeItem', {
            title: 'ImpactCast - ' + changeItem.changeTitle,
            heading: "Update " + changeItem.changeTitle,
            projectCode: req.params.projectCode,
            changeItem: changeItem
        });
    })
};


//Run update query
exports.update = function (req, callback) {

    let newData = {
        changeTitle: req.body.changeTitle,
        status: req.body.status,
        lid: req.body.lid,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        risks: req.body.risks,
        assumptions: req.body.assumptions,
    };

    changeItem.findOneAndUpdate({changeTitle: req.params.changeItem}, newData, {
        upsert: false,
        new: false
    }).then(() => {
        let result = {
            projectCode: req.params.projectCode,
            changeTitle: req.body.changeTitle
        };

        callback(result)
    })
};

//delete the changeItem
exports.delete = function (req, callback) {

    changeItem.findOneAndRemove({
        changeTitle: req.params.changeItem
    }).then(callback);

};









