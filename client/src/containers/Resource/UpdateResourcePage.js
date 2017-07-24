/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {loadDocument} from '../../api';
import UpdateResource from '../../components/Resource/UpdateResource';

export default class UpdateResourcePage extends Component {
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
            <UpdateResource resource={this.state.resource}/>
        )
    }
}