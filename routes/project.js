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
    res.render('project/newProject', {title: 'ImpactCast - New Project', heading: 'Create a new project'});
};


//Submit the new project form
exports.addNewProject = function (req, res) {

    //Add to database
    var data = new project({
        projectCode: req.body.projectCode,
        projectTitle: req.body.projectName
    });
    data.save();

    res.body = {projectCode: req.body.projectCode};
    res.redirect('/project/' + req.body.projectCode);
};


//Load the project info page
exports.view = function (req, res) {

    project.findOne({
        projectCode: req.params.projectCode
    }).populate('changeItems').then(function (project) {
        res.render('project/project', {
            title: 'ImpactCast - ' + project.projectTitle,
            heading: project.projectTitle,
            project: project
        });
    })
};


//Load the search form
exports.searchProjects = function (req, res) {
    res.render('project/searchProjects', {title: 'ImpactCast - Search Projects', heading: 'Search Projects'});
};


//Load the search results page
exports.runSearchProjects = function (req, res) {

    project.aggregate([
        {$unwind: "$changeItems"},
        {
            $lookup: {
                from: "changeItem",
                localField: "changeItems",
                foreignField: "_id",
                as: "changeItems"
            }
        },
        {$unwind: "$changeItems"},
        {
            $match: {
                "changeItems.changeTitle": {$regex: "(?i).*" + req.body.changeItemTitle + ".*"},
                "changeItems.status": {$regex: "(?i).*" + req.body.changeItemStatus + ".*"},
                projectCode: {$regex: "(?i).*" + req.body.projectCode + ".*"},
                projectTitle: {$regex: "(?i).*" + req.body.projectTitle + ".*"}
            }
        },
        {
            $group: {
                _id: "$_id",
                projectCode: {"$first": "$projectCode"},
                projectTitle: {"$first": "$projectTitle"},
                changeItems: {"$push": "$changeItems"}
            }
        }

    ]).then(function (results) {
        res.render('project/searchProjectsResults', {
            title: 'ImpactCast - Search Results',
            heading: 'Search Results',
            projects: results
        });
    })
};


//load update project info form
exports.viewUpdate = function (req, res) {

    project.findOne({
        projectCode: req.params.projectCode
    }).then(function (project) {
        res.render('project/updateProject', {
            title: 'ImpactCast - ' + project.projectCode,
            heading: "Update " + project.projectCode,
            project: project
        });
    })
};

//update project info
exports.update = function (req, res) {

    var newData = {
        projectCode: req.body.projectCode,
        projectTitle: req.body.projectName
    };

    project.findOneAndUpdate({projectCode: req.params.projectCode}, newData, {
        upsert: false,
        new: false
    }, function (err, project) {
        if (err) {
            return res.send(500, {error: err});
        } else {

            res.body = {
                title: 'ImpactCast - ' + project.projectCode,
                heading: "Update " + project.projectCode,
                project: project
            };
            res.redirect('/project/' + req.body.projectCode);
        }
    });
};


//delete the project
exports.delete = function (req, res) {

    project.findOneAndRemove({
        projectCode: req.params.projectCode
    }, function (err, doc) {
        res.redirect('/');
    });

};


//find all projects containing a change item with status
exports.getProjectsWithStatus = function (status, callback) {
    project.aggregate([
        {$unwind: "$changeItems"},
        {
            $lookup: {
                from: "changeItem",
                localField: "changeItems",
                foreignField: "_id",
                as: "changeItems"
            }
        },
        {$unwind: "$changeItems"},
        {
            $match: {
                "changeItems.status": status
            }
        },
        {
            $group: {
                _id: "$_id",
                projectCode: {"$first": "$projectCode"},
                projectTitle: {"$first": "$projectTitle"},
                changeItems: {"$push": "$changeItems"}
            }
        }

    ]).then(function (results) {
        callback(results);
    })
};


//get projects assigned to resource with impacts between two dates
exports.getProjectsByResourceImpactMonth = function (resourceId, startDate, endDate, callback) {

    project.aggregate([
        {$unwind: "$changeItems"},
        {
            $lookup: {
                from: "changeItem",
                localField: "changeItems",
                foreignField: "_id",
                as: "changeItems"
            }
        },
        {$unwind: "$changeItems"},
        {$unwind: "$changeItems.resourcesRequired"},
        {
            $lookup: {
                from: "requiredResource",
                localField: "changeItems.resourcesRequired",
                foreignField: "_id",
                as: "changeItems.resourcesRequired"
            }
        },
        {$unwind: "$changeItems.resourcesRequired"},
        {
            $lookup: {
                from: "resource",
                localField: "changeItems.resourcesRequired.forecastedResource",
                foreignField: "_id",
                as: "changeItems.resourcesRequired.forecastedResource"
            }
        },
        {$unwind: "$changeItems.resourcesRequired.forecastedResource"},
        {$unwind: "$changeItems.resourcesRequired.impact"},
        {
            $lookup: {
                from: "impact",
                localField: "changeItems.resourcesRequired.impact",
                foreignField: "_id",
                as: "changeItems.resourcesRequired.impact"
            }
        }, {$unwind: "$changeItems.resourcesRequired.impact"},
        {
            $match: {
                "changeItems.resourcesRequired.forecastedResource._id": mongoose.mongo.ObjectID( resourceId ),
                "changeItems.resourcesRequired.impact.month": {$gte: startDate, $lt: endDate}
            }
        },
        {
            $group: {
                _id: "$_id",
                projectCode: {"$first": "$projectCode"},
                projectTitle: {"$first": "$projectTitle"},
                changeItems: {"$push": "$changeItems"}
            }
        }
    ]).then(function (results) {

        callback(results);
    })
};