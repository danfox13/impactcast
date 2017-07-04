var project = require('./project');

exports.index = function(req, response){

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

    let responseBody = {};
    responseBody.results = [newItems, rejectedImpacts, readyToImpact, readyToForecast];
    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(responseBody));
    response.end();

    /*if (res.error){
        responseBody.error = res.error;
        response.statusCode = 500;
    } else if (res.results){
        responseBody.results = [newItems, rejectedImpacts, readyToImpact, readyToForecast];
        console.log("Results: " + newItems + ', ' + rejectedImpacts + ', ' + readyToForecast + ', ' + readyToImpact);
        response.statusCode = 200;
    } else {
        responseBody.error = "unknown issue";
        response.statusCode = 500;
    }

    response.setHeader('Content-Type', 'application/json');
    response.write(JSON.stringify(responseBody));
    response.end();*/

    /*setTimeout(function() {

        res.render('index', {
            title: 'ImpactCast - Home',
            heading: 'Home',
            newItems: newItems,
            readyToImpact: readyToImpact,
            readyToForecast: readyToForecast,
            rejectedImpacts: rejectedImpacts
        });
    }, 1000); */
};