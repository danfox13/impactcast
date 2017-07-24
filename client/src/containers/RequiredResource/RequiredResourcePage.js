/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {loadDocument} from '../../api';

import RequiredResourceDetails from '../../components/RequiredResource/RequiredResourceDetails';
import Impact from '../../components/RequiredResource/Impact';

export default class RequiredResourcePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requiredResource: ''
        };

        this.loadDocument = loadDocument.bind(this);
        this.loadDocument('/project/' + this.props.params.projectCode
                        + '/' + this.props.params.changeItem
                        + '/' + this.props.params.resourceId);
    }

    render() {
        return (
            <div>
                <RequiredResourceDetails requiredResource={this.state.requiredResource}
                                         projectCode={this.props.params.projectCode}
                                         changeItem={this.props.params.changeItem}/>
                <Impact requiredResource={this.state.requiredResource}
                        projectCode={this.props.params.projectCode}
                        changeItem={this.props.params.changeItem}/>
            </div>
        )
    }
}