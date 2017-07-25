/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';
import TeamSearchResults from '../../components/Team/TeamSearchResults';
import {loadDocument} from '../../api';

export default class TeamSearchResultsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        };

        this.loadDocument = loadDocument.bind(this);
        this.loadDocument(`/searchTeams?teamName=${props.location.query.teamName}&resourceName=${props.location.query.resourceName}`)
    }

    render() {
        return (
            <div>
                <TeamSearchResults searchResults={this.state.results}/>
            </div>
        )
    }
}