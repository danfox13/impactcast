var mongoose = require('mongoose');
var changeItem = require('./changeItem');

mongoose.connect('localhost:27017/partyparrot');

var Schema = mongoose.Schema;
var projectSchema = new Schema({
    projectCode: {type: String, required: true},
    projectTitle: {type: String, required: true},
    changeItems: [{type: Schema.Types.ObjectId, ref: 'changeItem'}]
}, {collection: 'project'});


var project = mongoose.model('project', projectSchema);

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
    res.render('project/newProject', {title: 'PartyParrot - New Project', heading: 'Create a new project'});
};


//Submit the new project form
exports.addNewProject = function (req, res) {
    console.log('addNewProject');

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
            title: 'PartyParrot - ' + project.projectTitle,
            heading: project.projectTitle,
            project: project
        });
        console.log(project);
    })
    //TODO more project crap
};


//Load the search form
exports.searchProjects = function (req, res) {
    res.render('project/searchProjects', {title: 'PartyParrot - Search Projects', heading: 'Search Projects'});
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
        console.log(results);
        res.render('project/searchProjectsResults', {
            title: 'PartyParrot - Search Results',
            heading: 'Search Results',
            projects: results
        });
    })
};


//Update project Info
exports.viewUpdate = function (req, res) {

    //TODO project.find().populate(changeItems).then(function(results) {
    project.findOne({
        projectCode: req.params.projectCode
    }).then(function (project) {
        res.render('project/updateProject', {
            title: 'PartyParrot - ' + project.projectCode,
            heading: "Update " + project.projectCode,
            project: project
        });
        console.log(project);
    })
};

//Run update query
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
                title: 'PartyParrot - ' + project.projectCode,
                heading: "Update " + project.projectCode,
                project: project
            };
            res.redirect('/project/' + req.body.projectCode);
        }
    });

};

//delete the project
exports.delete = function (req, res) {

    //TODO error handling
    project.findOneAndRemove({
        projectCode: req.params.projectCode
    }, function (err, doc) {
        res.redirect('/');
    });

};

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
        console.log(results);
        callback(results);
    })
};

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