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
exports.addRequiredResource = function (changeTitle, requiredResourceID) {
    changeItem.findOne({
        changeTitle: changeTitle
    }).then(function (changeItem) {
        changeItem.resourcesRequired.push(requiredResourceID);
        changeItem.save();
    })
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
    }).populate('resourcesRequired')
        .populate({
        path: 'resourcesRequired',
        model: 'requiredResource',
        populate: [{
            path: 'impact',
            model: 'impact'
        },
        {
            path: 'forecastedResource',
            model: 'resource'
        }]
    }).then(function (changeItem) {
        let totalManDays = [];

        changeItem.resourcesRequired.forEach(function (resource) {
            let dayCount = 0;

            resource.impact.forEach(function (monthlyImpact) {
                dayCount += parseInt(monthlyImpact.days);
            });

            totalManDays.push(dayCount);
        });

        callback({changeItem: changeItem, totalManDays: totalManDays})
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









