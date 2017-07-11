var mongoose = require('mongoose');
var requiredResource = require('./requiredResource');
var globals = require('../globals');
var dburl = globals.dburl.toString();
mongoose.createConnection(dburl);

var Schema = mongoose.Schema;
var actualSchema = new Schema({
    month: Date,
    days: Number
}, {collection: 'actual'});

var actual = mongoose.model('actual', actualSchema);

//add a new actual
exports.add = function (req, res) {
    var month = req.body.month;
    var year = req.body.year;
    var date = new Date(year, month, 1);

    var data = new actual({
        month: date,
        days: req.body.days
    });

    data.save();
    requiredResource.addActual(req.params.resourceId, data._id);
    setTimeout(function(){
        res.redirect('/project/' + req.params.projectCode + '/' + req.params.changeItem + '/' + req.params.resourceId);
    }, 1000);
};


//delete an impact
exports.delete = function (req, res) {

    actual.findOneAndRemove({
        _id: req.params.actualId
    }, function (err, doc) {
        setTimeout(function(){
            res.redirect('/project/' + req.params.projectCode + '/' + req.params.changeItem + '/' + req.params.resourceId);
        }, 1000);
    });
};