/**
 * @author - Greg Wolverson
 */
import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from '../components/App';
import HomePage from '../containers/HomePage';

// Team Route Components
import NewProjectPage from '../containers/Project/NewProjectPage';
import SearchProjectsAndItems from '../containers/Project/SearchProjectsAndItems';
import ProjectSearchResults from '../containers/Project/ProjectSearchResultsPage';
import TeamPage from '../containers/Team/TeamPage';

// Team Route Components
import NewTeamPage from '../containers/Team/NewTeamPage';
import SearchTeamsPage from '../containers/Team/SearchTeamsPage';
import TeamSearchResults from '../containers/Team/TeamSearchResultsPage';

// Resource Route Components
import NewResourcePage from '../containers/Resource/NewResourcePage';
import SearchResourcesPage from '../containers/Resource/SearchResourcesPage';
import ResourceSearchResults from '../containers/Resource/ResourceSearchResultsPage';
import ResourcePage from '../containers/Resource/ResourcePage';

import NotFoundPage from '../containers/NotFoundPage';

export default class AppRoutes extends Component {
    render() {
        return (
            <Router history={browserHistory} >
                <Route path="/" component={App}>
                    <IndexRoute component={HomePage} />
                    <Route path="newProject" component={NewProjectPage}/>
                    <Route path="searchProjects" component={SearchProjectsAndItems} />
                    <Route path="projectSearchResults" component={ProjectSearchResults}/>

                    <Route path="newTeam" component={NewTeamPage}/>
                    <Route path="searchTeams" component={SearchTeamsPage} />
                    <Route path="teamSearchResults" component={TeamSearchResults}/>
                    <Route path="team/:teamName" component={TeamPage}/>

                    <Route path="newResource" component={NewResourcePage} />
                    <Route path="searchResources" component={SearchResourcesPage} />
                    <Route path="resourceSearchResults" component={ResourceSearchResults} />
                    <Route path="resource/:id" component={ResourcePage}/>
                </Route>
                <Route path="*" component={NotFoundPage}/>
            </Router>
        )
    }
}
