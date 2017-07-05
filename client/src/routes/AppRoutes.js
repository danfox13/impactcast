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

// Resource Route Components
import NewResourcePage from '../containers/Resource/NewResourcePage';
import SearchResourcesPage from '../containers/Resource/SearchResourcesPage';
import ResourceSearchResults from '../containers/Resource/ResourceSearchResultsPage';
import ResourcePage from '../containers/Resource/ResourcePage';
import EditResourcePage from '../containers/Resource/EditResourcePage';

import NotFoundPage from '../containers/NotFoundPage';
import LoginPage from '../containers/Login';

export default class AppRoutes extends Component {
    render() {
        return (
            <Router history={browserHistory} >
                <Route path="/" component={App}>
                    <IndexRoute component={HomePage} />
                    <Route path="/newProject" component={NewProjectPage}/>
                    <Route path="/searchProjects" component={SearchProjectsAndItems} />
                    <Route path="/projectSearchResults" component={ProjectSearchResults}/>
                    <Route path="/project/:id" component={Project}/>
                    <Route path="/project/:id/update" component={UpdateProjectPage}/>

                    <Route path="/newTeam" component={NewTeamPage}/>
                    <Route path="/searchTeams" component={SearchTeamsPage} />
                    <Route path="/teamSearchResults" component={TeamSearchResults}/>
                    <Route path="/team/:id" component={TeamPage}/>

                    <Route path="/newResource" component={NewResourcePage} />
                    <Route path="/searchResources" component={SearchResourcesPage} />
                    <Route path="/resourceSearchResults" component={ResourceSearchResults} />
                    <Route path="/resource/:id" component={ResourcePage}/>
                    <Route path="/resource/:id/update" component={EditResourcePage}/>
                </Route>

                <Route path="/login" component={LoginPage}/>
                <Route path="*" component={NotFoundPage}/>
            </Router>
        )
    }
}
