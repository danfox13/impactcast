/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';
import ProjectSearchResults from '../../components/Project/ProjectSearchResults';
import {loadDocument} from '../../api';

export default class ProjectSearchResultsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        };

        this.loadDocument = loadDocument.bind(this);
        this.loadDocument('/searchProjects?projectCode=' + props.location.query.projectCode
            + '&projectTitle=' + props.location.query.projectTitle
            + '&changeItemTitle=' + props.location.query.changeItemTitle
            + '&changeItemStatus=' + props.location.query.changeItemStatus);
    }

    render() {
        return (
            <ProjectSearchResults searchResults={this.state.results}/>
        )
    }
}