/**
 *
 * @type {*}
 */


var express = require('express');
var app = express.Router();

var site = require('./site');
var project = require('./project');
var changeItem = require('./changeItem');
var requiredResource = require('./requiredResource');
var impact = require('./impact');
var team = require('./team');
var resource = require('./resource');
var user = require('./user');


//General Site URIs
app.get('/', site.login);
app.post('/login', user.login);
app.get('/logout', user.logout);
app.get('/home', site.index);

//Password reset URIs
app.get('/reset/login/:result?', user.loadLogin);
app.get('/reset/forgotPassword/:result?', user.forgotPassword);
app.post('/reset/forgotPassword', user.resetPassword);
app.get('/reset/:token', user.resetPasswordLink);
app.post('/reset/changeForgottenPassword/:email', user.changeForgottenPassword);

//adding user URIs
app.get('/addUser/:result?', user.viewAddUser);
app.post('/addUser', user.addUser);

//user profile URIs
app.get('/myProfile', user.myProfile);
app.get('/user/:user/viewProfile/:forgot?', user.viewUserProfile);
app.get('/viewUsers', user.viewUsers);

//changing password URIs
app.post('/changePassword', user.changePassword);

//changing name URIs
app.post('/user/:user/changeName', user.changeName);

//changing Slack handle URIs
app.post('/changeSlack', user.changeSlack);

//hints URIs
app.get('/toggleHints', user.toggleHints);

//deleting user URIs
app.post('/deleteMe', user.deleteMe);
app.get('/user/:user/deleteUser/:result?', user.showDeleteUser);
app.post('/user/:user/deleteUser', user.deleteUser);

//permissions URIs
app.get('/user/:user/admin/:type/:result?', user.showAdminControl);
app.post('/user/:user/flipAdmin', user.flipAdmin);

//Project URIs
app.get('/newProject', project.newProject);
app.post('/newProject', project.addNewProject);
app.get('/searchProjects', project.searchProjects);
app.post('/searchProjects', project.runSearchProjects);
app.get('/project/:projectCode', project.view);
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
app.get('/newTeam', team.newTeam);
app.post('/newTeam', team.addNewTeam);
app.get('/searchTeams', team.viewSearchTeams);
app.post('/searchTeams', team.searchTeams);
app.get('/team/:teamName', team.view);
app.get('/team/:teamName/update', team.viewUpdate);
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