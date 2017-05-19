var mongoose = require('mongoose');
var requiredResource = require('./requiredResource');
mongoose.createConnection('localhost:27017/partyparrot');

var Schema = mongoose.Schema;
var impactSchema = new Schema({
    month: Date,
    days: Number
}, {collection: 'impact'});

var impact = mongoose.model('impact', impactSchema);


exports.add = function (req, res) {
    var month = req.body.month;
    var year = req.body.year;
    var date = new Date(year, month, 1);

    var data = new impact({
        month: date,
        days: req.body.days
    });

    data.save();
    requiredResource.addImpact(req.params.resourceId, data._id);
    setTimeout(function(){
        res.redirect('/project/' + req.params.projectCode + '/' + req.params.changeItem + '/' + req.params.resourceId);
    }, 1000);
};

exports.delete = function (req, res) {

    //TODO error handling
    impact.findOneAndRemove({
        _id: req.params.impactId
    }, function (err, doc) {
        setTimeout(function(){
            res.redirect('/project/' + req.params.projectCode + '/' + req.params.changeItem + '/' + req.params.resourceId);
        }, 1000);
    });
};