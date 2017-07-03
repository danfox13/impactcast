/**
 * @author - Greg Wolverson
 */
import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from '../components/App';
import HomePage from '../containers/HomePage';
import NewProjectPage from '../containers/NewProjectPage';
import SearchProjectsAndItems from '../containers/SearchProjectsAndItems';
import NewTeamPage from '../containers/NewTeamPage';
import SearchTeamsPage from '../containers/SearchTeamsPage';
import NewResourcePage from '../containers/NewResourcePage';
import SearchResourcesPage from '../containers/SearchResourcesPage';
import ProjectSearchResults from '../containers/ProjectSearchResultsPage';
import TeamSearchResults from '../containers/TeamSearchResultsPage';
import ResourceSearchResults from '../containers/ResourceSearchResultsPage';
import NotFoundPage from '../containers/NotFoundPage';

export default class AppRoutes extends Component {
    render() {
        return (
            <Router history={browserHistory} >
                <Route path="/" component={App}>
                    <IndexRoute component={HomePage} />
                    <Route path="/newProject" component={NewProjectPage}/>
                    <Route path="/searchProjects" component={SearchProjectsAndItems} />
                    <Route path="/projectSearchResults" component={ProjectSearchResults}/>
                    <Route path="/newTeam" component={NewTeamPage}/>
                    <Route path="/searchTeams" component={SearchTeamsPage} />
                    <Route path="/teamSearchResults" component={TeamSearchResults}/>
                    <Route path="/newResource" component={NewResourcePage} />
                    <Route path="/searchResources" component={SearchResourcesPage} />
                    <Route path="/resourceSearchResults" component={ResourceSearchResults} />
                </Route>
                <Route path="*" component={NotFoundPage}/>
            </Router>
        )
    }
}
