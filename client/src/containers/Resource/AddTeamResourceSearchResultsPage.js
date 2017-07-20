/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {loadDocument} from '../../api';
import AddTeamResourceSearchResults from '../../components/Resource/AddTeamResourceSearchResults';

export default class AddTeamResourceSearchResultsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: []
        };

        this.loadDocument = loadDocument.bind(this);
        this.loadDocument('/searchResources?resourceName=' + this.props.location.query.resourceName
            + '&employeeId=' + this.props.location.query.employeeId
            + '&location=' + this.props.location.query.location
            + '&email=' + this.props.location.query.email
            + '&role=' + this.props.location.query.role);
    }

    render() {
        return (
            <div>
                <AddTeamResourceSearchResults teamName={this.props.params.teamName} searchResults={this.state.results}/>
            </div>
        )
    }
}