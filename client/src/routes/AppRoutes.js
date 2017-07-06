/**
 * @author - Greg Wolverson
 */
import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from '../components/App';
import HomePage from '../containers/HomePage';

// Project Route Components
import NewProjectPage from '../containers/Project/NewProjectPage';
import SearchProjectsAndItems from '../containers/Project/SearchProjectsAndItems';
import ProjectSearchResults from '../containers/Project/ProjectSearchResultsPage';
import Project from '../containers/Project/ProjectPage';
import UpdateProjectPage from '../containers/Project/UpdateProjectPage';

// Team Route Components
import NewTeamPage from '../containers/Team/NewTeamPage';
import SearchTeamsPage from '../containers/Team/SearchTeamsPage';
import TeamSearchResults from '../containers/Team/TeamSearchResultsPage';
import TeamPage from '../containers/Team/TeamPage';

// Change Item Components
import ChangeItem from '../containers/ChangeItem/ChangeItem';
import NewChangeItemPage from '../containers/ChangeItem/NewChangeItemPage';
import UpdateChangeItemPage from '../containers/ChangeItem/UpdateChangeItemPage';
import AddRequiredResourcePage from '../containers/ChangeItem/AddRequiredResourcePage';

// Resource Route Components
import NewResourcePage from '../containers/Resource/NewResourcePage';
import SearchResourcesPage from '../containers/Resource/SearchResourcesPage';
import ResourceSearchResults from '../containers/Resource/ResourceSearchResultsPage';
import ResourcePage from '../containers/Resource/ResourcePage';
import UpdateResourcePage from '../containers/Resource/UpdateResourcePage';

import NotFoundPage from '../containers/NotFoundPage';
import LoginPage from '../containers/Login';

export default class AppRoutes extends Component {
    render() {
        return (
            <Router history={browserHistory} >
                <Route path="/" component={App}>
                    <IndexRoute component={HomePage} />
                    <Route path="newProject" component={NewProjectPage}/>
                    <Route path="searchProjects" component={SearchProjectsAndItems} />
                    <Route path="projectSearchResults" component={ProjectSearchResults}/>
                    <Route path="project/:projectCode" component={Project}/>
                    <Route path="project/:projectCode/update" component={UpdateProjectPage}/>

                    <Route path="project/:projectCode/newChangeItem" component={NewChangeItemPage}/>
	                <Route path="project/:projectCode/:changeItem" component={ChangeItem}/>
                    <Route path="project/:projectCode/:changeItem/addRequiredResource"
                           component={AddRequiredResourcePage}/>
                    <Route path="project/:projectCode/:changeItem/update" component={UpdateChangeItemPage}/>

                    <Route path="newTeam" component={NewTeamPage}/>
                    <Route path="searchTeams" component={SearchTeamsPage} />
                    <Route path="teamSearchResults" component={TeamSearchResults}/>
                    <Route path="team/:teamName" component={TeamPage}/>

                    <Route path="newResource" component={NewResourcePage} />
                    <Route path="searchResources" component={SearchResourcesPage} />
                    <Route path="resourceSearchResults" component={ResourceSearchResults} />
                    <Route path="resource/:resourceName" component={ResourcePage}/>
                    <Route path="resource/:resourceName/update" component={UpdateResourcePage}/>
                </Route>

                <Route path="/login" component={LoginPage}/>
                <Route path="*" component={NotFoundPage}/>
            </Router>
        )
    }
}
