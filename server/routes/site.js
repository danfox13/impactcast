const project = require('./project');

exports.index = function(request, response){

    let newItems = {};
    let readyToImpact = {};
    let readyToForecast = {};
    let rejectedImpacts = {};

    let responses = [];

    responses.push(new Promise(function (resolve, reject) {
        project.getProjectsWithStatus("New", function(results){
            newItems = results;
            resolve();
        });
    }));

    responses.push(new Promise(function (resolve, reject) {
        project.getProjectsWithStatus("Impacting", function(results){
            readyToImpact = results;
            resolve();
        });
    }));

    responses.push(new Promise(function (resolve, reject) {
        project.getProjectsWithStatus("Approved", function(results){
            readyToForecast = results;
            resolve();
        });
    }));

    responses.push(new Promise(function (resolve, reject) {
        project.getProjectsWithStatus("Returned", function(results){
            rejectedImpacts = results;
            resolve();
        });
    }));

    Promise.all(responses).then(function () {

        let responseBody = {};

        responseBody.results = {
            newItems: newItems,
            readyToImpact: readyToImpact,
            rejectedImpacts: rejectedImpacts,
            readyToForecast: readyToForecast
        };

        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(responseBody));
        response.end();
    });
};


