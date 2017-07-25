/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';
import ResourceSearchResults from '../../components/Resource/ResourceSearchResults';
import {loadDocument} from '../../api';

export default class ResourceSearchResultsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: []
        };

        this.loadDocument = loadDocument.bind(this);
        this.loadDocument('/searchResources?resourceName='
            + props.location.query.resourceName
            + '&employeeId=' + props.location.query.employeeId
            + '&location=' + props.location.query.location
            + '&email=' + props.location.query.email
            + '&role=' + props.location.query.role);
    }

    render() {
        return (
            <ResourceSearchResults searchResults={this.state.results}/>
        )
    }
}