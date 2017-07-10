var express = require('express');
var app = express.Router();

var site = require('./site');
var project = require('./project');
var changeItem = require('./changeItem');
var requiredResource = require('./requiredResource');
var impact = require('./impact');
var team = require('./team');
var resource = require('./resource');

app.get('/homeData', function(request, response){
    site.index(request, response);
});

// Team URI's
app.get('/searchTeams', function (request, response) {
    let teamName = request.query.teamName;
    let resourceName = request.query.resourceName;

    team.searchTeams(teamName, resourceName, function(results) {
        let responseBody = {};

        responseBody.results = {
            results: results
        };

        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(responseBody));
        response.end();
    });
});

app.post('/newTeam', function(request, response) {

    let teamName = request.body.teamName;

    let responseBody = {};

    team.addNewTeam(teamName, function(results) {

        responseBody.result = {
            teamName: teamName
        };

        response.setHeader('Content-Type', 'application/json');
        response.statusCode = 200;
        response.write(JSON.stringify(responseBody));
        response.end();
    });
});

app.get('/team/:teamName', function (request, response) {

    let teamName = request.params.teamName;

    team.view(teamName, function(result) {
        let responseBody = {};

        responseBody.result = {
            team: result.team,
            teamForecast: result.forecast
        };

        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(responseBody));
        response.end();
    });
});

// Project URIs

app.post('/newProject', (request, response) => {
    project.addNewProject(request, () => {
        let responseBody = {};
        responseBody.result = {
            projectCode: request.body.projectCode
        };

        response.setHeader('Content-Type', 'application/json');
        response.statusCode = 200;
        response.write(JSON.stringify(responseBody));
        response.end();
    });
});

app.get('/searchProjects', (request, response) => {
    project.runSearchProjects(request.query, results => {
        let responseBody = {};

        responseBody.results = {
            results: results
        };

        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(responseBody));
        response.end();
    });
});

app.get('/project/:projectCode', (request, response) => {
    project.view(request.params.projectCode, result => {
       let responseBody = {};

       responseBody.result = {
           projectTitle: result.projectTitle,
           changeItems: result.changeItems
       };

       response.setHeader('Content-Type', 'application/json');
       response.write(JSON.stringify(responseBody));
       response.end();
    });
});


//Project URIs
//app.get('/newProject', project.newProject);
//app.post('/newProject', project.addNewProject);
//app.get('/searchProjects', project.searchProjects);
//app.post('/searchProjects', project.runSearchProjects);
//app.get('/project/:projectCode', project.view);
app.get('/project/:projectCode/update', project.viewUpdate);
app.post('/project/:projectCode/update', project.update);
app.get('/project/:projectCode/delete', project.delete);

//Change Item URIs
app.get('/project/:projectCode/newChangeItem', changeItem.newChangeItem);
app.post('/project/:projectCode/newChangeItem', changeItem.addChangeItem);
app.get('/project/:projectCode/:changeItem', changeItem.view);
app.get('/project/:projectCode/:changeItem/update', changeItem.viewUpdate);
app.post('/project/:projectCode/:changeItem/update', changeItem.update);
app.get('/project/:projectCode/:changeItem/delete', changeItem.delete);

//Required Resource URIs
app.get('/project/:projectCode/:changeItem/addRequiredResource', requiredResource.addResourceView);
app.post('/project/:projectCode/:changeItem/addRequiredResource', requiredResource.addResource);
app.get('/project/:projectCode/:changeItem/:resourceId', requiredResource.view);
app.get('/project/:projectCode/:changeItem/:resourceId/update', requiredResource.editResourceView);
app.post('/project/:projectCode/:changeItem/:resourceId/update', requiredResource.editResource);
app.get('/project/:projectCode/:changeItem/:resourceId/delete', requiredResource.delete);
app.get('/project/:projectCode/:changeItem/:reqResourceId/assign/:resourceId', requiredResource.assign);

//Impact URIs
app.post('/project/:projectCode/:changeItem/:resourceId/addImpact', impact.add);
app.get('/project/:projectCode/:changeItem/:resourceId/:impactId/delete', impact.delete);

//Team URIs
//app.get('/newTeam', team.newTeam);
app.post('/newTeam', team.addNewTeam);
//app.get('/searchTeams', team.viewSearchTeams);
//app.post('/searchTeams', team.searchTeams);
//app.get('/team/:teamName', team.view);
//app.get('/team/:teamName/update', team.viewUpdate);
app.post('/team/:teamName/update', team.update);
app.get('/team/:teamName/delete', team.delete);
app.get('/team/:teamName/addToTeam/:resourceId', team.addTeamMember);
app.get('/team/:teamName/remove/:resourceId', team.removeTeamMember);

//Resource URIs
app.get('/newResource', resource.viewNewResource);
app.post('/newResource', resource.newResource);
app.get('/resource/:resourceId', resource.view);
app.get('/searchResources', resource.viewSearchResources);
app.post('/searchResources', resource.searchResources);
app.get('/resource/:resourceId/delete', resource.delete);
app.get('/resource/:resourceId/update', resource.viewUpdate);
app.post('/resource/:resourceId/update', resource.update);
app.get('/project/:projectCode/:changeItem/:resourceId/forecastResource', resource.viewFindResource);
app.post('/project/:projectCode/:changeItem/:resourceId/forecastResource', resource.findResource);
app.get('/team/:teamName/addTeamMember', resource.viewFindTeamMember);
app.post('/team/:teamName/addTeamMember', resource.findTeamMember);

module.exports = app;