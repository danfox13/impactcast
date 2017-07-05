var project = require('./project');

exports.index = function(req, res){

    var newItems = [];
    var readyToImpact = [];
    var readyToForecast = [];
    var rejectedImpacts = [];

    project.getProjectsWithStatus("New", function(results){
        newItems = results;
    });

    project.getProjectsWithStatus("Impacting", function(results){
        readyToImpact = results;
    });

    project.getProjectsWithStatus("Approved", function(results){
        readyToForecast = results;
    });

    project.getProjectsWithStatus("Returned", function(results){
        rejectedImpacts = results;
    });

    setTimeout(function() {

        res.render('index', {
            title: 'ImpactCast - Home',
            heading: 'Home',
            newItems: newItems,
            readyToImpact: readyToImpact,
            readyToForecast: readyToForecast,
            rejectedImpacts: rejectedImpacts
        });
    }, 1000);
};

exports.login = function(req, res){
    res.render('login', {
        title: 'ImpactCast - Login',
        failedLogin: false
    });
};

exports.failedLogin = function(req, res){
    res.render('login', {
        title: 'ImpactCast - Login',
        failedLogin: true
    });
};