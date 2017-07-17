/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';
import ResourceDetails from '../../components/Resource/ResourceDetails';
import ResourceForecast from '../../components/Resource/ResourceForecast';
import {loadDocument} from '../../api';

export default class ResourcePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resource: ''
        };

        this.loadDocument = loadDocument.bind(this);
        this.loadDocument('/resource/' + this.props.params.resourceId);
    }

    render() {
        return (
            <div>
                <ResourceDetails resource={this.state.resource}/>
                <ResourceForecast resource={this.state.resource} projects={this.state.months}
                                  workingDays={this.state.monthsWorkingDays}/>
            </div>
        )
    }
}