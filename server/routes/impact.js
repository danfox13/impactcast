var mongoose = require('mongoose');
var requiredResource = require('./requiredResource');
var globals = require('../globals');
var dburl = globals.dburl.toString();
mongoose.createConnection(dburl);

var Schema = mongoose.Schema;
var impactSchema = new Schema({
    month: Date,
    days: Number
}, {collection: 'impact'});

var impact = mongoose.model('impact', impactSchema);

//add a new impact
exports.add = function (req, callback) {
    var month = req.body.month;
    var year = req.body.year;
    var date = new Date(year, month, 1);

    var data = new impact({
        month: date,
        days: req.body.days
    });

    data.save();
    requiredResource.addImpact(req.params.resourceId, data._id);
    callback(data);
};


//delete an impact
exports.delete = function (req, callback) {

    impact.findOneAndRemove({
        _id: req.params.impactId
    }).then(() => {
        requiredResource.removeImpact(req.params.resourceId, req.params.impactId);
        callback();
    })
};