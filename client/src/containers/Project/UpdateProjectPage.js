/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import UpdateProject from '../../components/Project/UpdateProject';
import {loadDocument} from '../../api';

export default class UpdateProjectPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectTitle: ''
        };

        this.loadDocument = loadDocument.bind(this);
    }

    componentWillMount() {
        this.loadDocument('project/' + this.props.params.projectCode + '/update')
    }

    render() {
        return (
            <UpdateProject projectCode={this.props.params.projectCode}
                           projectTitle={this.state.projectTitle}/>
        )
    }
}