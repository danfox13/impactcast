/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import ProjectDetails from '../../components/Project/ProjectDetails';
import ChangeItems from '../../components/Project/ChangeItems';
import {loadDocument} from '../../api';

export default class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectTitle: '',
            changeItems: []
        };

        this.loadDocument = loadDocument.bind(this);
        this.loadDocument(`/project/${this.props.params.projectCode}`);
    }

    render() {
        return (
            <div>
                <ProjectDetails
                    projectTitle={this.state.projectTitle}
                    projectCode={this.props.params.projectCode}
                />
                <ChangeItems
                    projectCode={this.props.params.projectCode}
                    changeItems={this.state.changeItems}
                />
            </div>
        )
    }
}