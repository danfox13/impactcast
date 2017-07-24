/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {loadDocument} from '../../api';
import ForecastResourceSearchResults from '../../components/Resource/ForecastResourceSearchResults';

export default class ForecastResourceSearchResultsPage extends Component {

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
            + '&role=' + this.props.location.query.role)
    }

    render() {
        return (
            <ForecastResourceSearchResults projectCode={this.props.params.projectCode}
                                           changeItem={this.props.params.changeItem}
                                           reqResourceId={this.props.params.resourceId}
                                           searchResults={this.state.results}/>
        )
    }
}