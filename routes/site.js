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

        console.log("newItems " + newItems);

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