var mongoose = require('mongoose');
var changeItem = require('./changeItem');
var globals = require('../globals');
var dburl = globals.dburl.toString();
mongoose.createConnection(dburl);

var Schema = mongoose.Schema;
var projectSchema = new Schema({
    projectCode: {type: String, required: true},
    projectTitle: {type: String, required: true},
    changeItems: [{type: Schema.Types.ObjectId, ref: 'changeItem'}]
}, {collection: 'project'});


var project = mongoose.model('project', projectSchema);

//Add a change Item
exports.addChangeItem = function (projectCode, changeItemID) {
    project.findOne({
        projectCode: projectCode
    }).then(function (project) {
        project.changeItems.push(changeItemID);
        project.save();
    })
};

//Load the new project form
exports.newProject = function (req, res) {
    res.render('project/newProject', {
        title: 'ImpactCast - New Project',
        heading: 'Create a new project'
    });
};


//Submit the new project form
exports.addNewProject = function (req, callback) {

    //Add to database
    let data = new project({
        projectCode: req.body.projectCode,
        projectTitle: req.body.projectTitle
    });
    data.save();

    callback();
};


//Load the project info page
exports.view = function (req, callback) {

    project.findOne({
        projectCode: req
    }).populate('changeItems').then(function (project) {
        let result = {
            projectTitle: project.projectTitle,
            changeItems: project.changeItems
        };

        callback(result);
    })
};


//Load the search results page
exports.runSearchProjects = function (req, callback) {

    project.find({
        projectCode: {$regex: `(?i).*${req.projectCode}.*`},
        projectTitle: {$regex: `(?i).*${req.projectTitle}.*`}
    }).populate({
        path: 'changeItems',
        model: 'changeItem',
        select: 'changeTitle status'
    }).then(projects => {
        const changeTitlePattern = new RegExp(`.*${req.changeItemTitle}.*`, 'i');
        let results = req.changeItemTitle.length || req.changeItemStatus ?
            projects.filter(project => project.changeItems.some(changeItem =>
                (req.changeItemTitle.length ? changeTitlePattern.test(changeItem.changeTitle) : true)
                &&
                (req.changeItemStatus.length ? changeItem.status === req.changeItemStatus : true)
            )) : projects;

        callback(results)
    })
};


//load update project info form
exports.viewUpdate = function (req, callback) {

    project.findOne({
        projectCode: req
    }).then(callback)
};

//update project info
exports.update = function (req, callback) {

    const newData = {
        projectCode: req.body.projectCode,
        projectTitle: req.body.projectTitle
    };

    project.findOneAndUpdate({projectCode: req.params.projectCode}, newData, {
        upsert: false,
        new: false
    }).then(callback)
};


//delete the project
exports.delete = function (req, callback) {
    project.findOneAndRemove({
        projectCode: req
    }).then(callback);
};


//find all projects containing a change item with status
exports.getProjectsWithStatus = function (status, callback) {
    project.aggregate([
        {$unwind: '$changeItems'},
        {
            $lookup: {
                from: 'changeItem',
                localField: 'changeItems',
                foreignField: '_id',
                as: 'changeItems'
            }
        },
        {$unwind: '$changeItems'},
        {
            $match: {
                'changeItems.status': status
            }
        },
        {
            $group: {
                _id: '$_id',
                projectCode: {'$first': '$projectCode'},
                projectTitle: {'$first': '$projectTitle'},
                changeItems: {'$push': '$changeItems'}
            }
        }

    ]).then(function (results) {
        callback(results);
    })
};


//get projects assigned to resource with impacts between two dates
exports.getProjectsByResourceImpactMonth = function (resourceId, startDate, endDate, callback) {

    project.aggregate([
        {$unwind: '$changeItems'},
        {
            $lookup: {
                from: 'changeItem',
                localField: 'changeItems',
                foreignField: '_id',
                as: 'changeItems'
            }
        },
        {$unwind: '$changeItems'},
        {$unwind: '$changeItems.resourcesRequired'},
        {
            $lookup: {
                from: 'requiredResource',
                localField: 'changeItems.resourcesRequired',
                foreignField: '_id',
                as: 'changeItems.resourcesRequired'
            }
        },
        {$unwind: '$changeItems.resourcesRequired'},
        {
            $lookup: {
                from: 'resource',
                localField: 'changeItems.resourcesRequired.forecastedResource',
                foreignField: '_id',
                as: 'changeItems.resourcesRequired.forecastedResource'
            }
        },
        {$unwind: '$changeItems.resourcesRequired.forecastedResource'},
        {$unwind: '$changeItems.resourcesRequired.impact'},
        {
            $lookup: {
                from: 'impact',
                localField: 'changeItems.resourcesRequired.impact',
                foreignField: '_id',
                as: 'changeItems.resourcesRequired.impact'
            }
        }, {$unwind: '$changeItems.resourcesRequired.impact'},
        {
            $match: {
                'changeItems.resourcesRequired.forecastedResource._id': mongoose.mongo.ObjectID(resourceId),
                'changeItems.resourcesRequired.impact.month': {$gte: startDate, $lt: endDate}
            }
        },
        {
            $group: {
                _id: '$_id',
                projectCode: {'$first': '$projectCode'},
                projectTitle: {'$first': '$projectTitle'},
                changeItems: {'$push': '$changeItems'}
            }
        }
    ]).then(callback)
};