/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {loadDocument} from '../../api';

import UpdateRequiredResource from '../../components/RequiredResource/UpdateRequiredResource';

export default class UpdateRequiredResourcePage extends Component {

    constructor() {
        super();
        this.state = {
            requiredResource: ''
        };

        this.loadDocument = loadDocument.bind(this);
    }

    componentWillMount() {
        this.loadDocument('/project/' + this.props.params.projectCode
                        + '/' + this.props.params.changeItem
                        + '/' + this.props.params.resourceId);
    }

    render() {
        return (
            <UpdateRequiredResource projectCode={this.props.params.projectCode}
                                    changeItem={this.props.params.changeItem}
                                    requiredResource={this.state.requiredResource}/>
        )
    }
}