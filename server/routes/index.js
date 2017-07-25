var express = require('express');
var app = express.Router();

var site = require('./site');
var project = require('./project');
var changeItem = require('./changeItem');
var requiredResource = require('./requiredResource');
var impact = require('./impact');
var team = require('./team');
var resource = require('./resource');

app.get('/homeData', function (request, response) {
    site.index(request, response);
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
    project.runSearchProjects(request.query, results =>
        response.send({results: results})
    );
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

app.get('/project/:projectCode/update', (request, response) => {
    project.viewUpdate(request.params.projectCode, result => {
        let responseBody = {};
        responseBody.result = {
            projectTitle: result.projectTitle
        };

        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(responseBody));
        response.end();
    });
});

app.post('/project/:projectCode/update', (request, response) => {
    project.update(request, () => {
        let responseBody = {};
        responseBody.result = {
            projectCode: request.body.projectCode
        };

        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(responseBody));
        response.end();
    })
});

app.get('/project/:projectCode/delete', (request, response) => {
    project.delete(request.params.projectCode, () => {
        let responseBody = {};
        responseBody.result = {
            route: '/'
        };

        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(responseBody));
        response.end();
    })
});

// Change Item URIs

app.post('/project/:projectCode/newChangeItem', (request, response) => {
    changeItem.addChangeItem(request, result => {
        let responseBody = {};
        responseBody.result = {
            changeTitle: result
        };

        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(responseBody));
        response.end();
    })
});

app.get('/project/:projectCode/:changeItem', (request, response) => {
    changeItem.view(request, function (result) {
        let responseBody = {};
        responseBody.result = result;

        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(responseBody));
        response.end();
    })
});

app.post('/project/:projectCode/:changeItem/update', (request, response) => {
    changeItem.update(request, result => {
        let responseBody = {};
        responseBody.result = {
            projectCode: result.projectCode,
            changeTitle: result.changeTitle
        };

        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(responseBody));
        response.end();
    })
});

app.get('/project/:projectCode/:changeItem/delete', (request, response) => {
    changeItem.delete(request, () => {
        let responseBody = {};
        responseBody.result = {
            route: '/project/' + request.params.projectCode
        };

        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(responseBody));
        response.end();
    })
});

// Required Resource URIs

app.post('/project/:projectCode/:changeItem/addRequiredResource', (request, response) => {
    requiredResource.addResource(request, result => {
        let responseBody = {};
        responseBody.result = {
            roleName: result
        };

        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(responseBody));
        response.end();
    })
});

app.get('/project/:projectCode/:changeItem/:resourceId', (request, response) => {
    requiredResource.view(request, result => {
        let responseBody = {};
        responseBody.result = {
            requiredResource: result
        };

        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(responseBody));
        response.end();
    })
});

app.post('/project/:projectCode/:changeItem/:resourceId/update', (request, response) => {
    requiredResource.editResource(request, () => {
        response.send({});
    })
});

app.get('/project/:projectCode/:changeItem/:resourceId/delete', (request, response) => {
    requiredResource.delete(request, () => {
        response.send({
            result: {
                route: '/project/' + request.params.projectCode
                + '/' + request.params.changeItem
            }
        });
    })
});

app.get('/project/:projectCode/:changeItem/:reqResourceId/assign/:resourceId', (request, response) => {
    requiredResource.assign(request, () => {
        response.send({});
    })
});

// Impact URIs

app.post('/project/:projectCode/:changeItem/:resourceId/addImpact', (request, response) => {
    impact.add(request, data => {
        let responseBody = {};
        responseBody.result = {
            route: '/project/' + request.params.projectCode
            + '/' + request.params.changeItem
            + '/' + request.params.resourceId,
            impact: data
        };

        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(responseBody));
        response.end();
    })
});

app.get('/project/:projectCode/:changeItem/:resourceId/:impactId/delete', (request, response) => {
    impact.delete(request, () => response.send({}))
});

// Team URIs

app.get('/searchTeams', function (request, response) {
    let teamName = request.query.teamName;
    let resourceName = request.query.resourceName;

    team.searchTeams(teamName, resourceName, function (results) {
        response.send({results: results})
    });
});

app.post('/newTeam', function (request, response) {

    let teamName = request.body.teamName;

    let responseBody = {};

    team.addNewTeam(teamName, function (results) {

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
    team.view(request.params.teamName, function (result) {
        let responseBody = {};

        responseBody.result = {
            team: result.team,
            teamForecast: result.teamForecast
        };

        response.send(responseBody);
    });
});

app.post('/team/:teamName/update', (request, response) => {
    team.update(request, () => {
        response.send({result: {route: '/team/' + request.body.teamName}})
    })
});
app.get('/team/:teamName/delete', (request, response) => {
    team.delete(request, () => response.send({result: {route: '/'}}))
});

app.get('/team/:teamName/addToTeam/:resourceId', (request, response) => {
    team.addTeamMember(request, () => response.send({}))
});
app.get('/team/:teamName/remove/:resourceId', (request, response) => {
    team.removeTeamMember(request, () => response.send({}))
});

// Resource URIs

app.post('/newResource', (request, response) => {
    resource.newResource(request, data => {
        response.send({result: {resourceId: data}})
    })
});

app.get('/resource/:resourceId', (request, response) => {
    resource.view(request, response)
});

app.get('/searchResources', (request, response) => {
    resource.searchResources(request, results => {
        response.send({results: results});
    })
});

app.get('/resource/:resourceId/delete', (request, response) => {
    resource.delete(request, response.send({result: {route: '/'}}));
});

app.post('/resource/:resourceId/update', (request, response) => {
    resource.update(request, response.send({}));
});

module.exports = app;