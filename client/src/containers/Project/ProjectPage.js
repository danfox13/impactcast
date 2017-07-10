/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import ProjectDetails from '../../components/Project/ProjectDetails';
import ChangeItems from '../../components/Project/ChangeItems';

export default class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectTitle: '',
            changeItems: []
        };

        this.loadData = this.loadData.bind(this);
    }

    componentWillMount() {
        this.loadData()
    }

    loadData() {
        let url = 'http://localhost:3001/project/' + this.props.params.projectCode;
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    projectTitle: data.result.projectTitle,
                    changeItems: data.result.changeItems
                });
            })
            .catch(err => console.log(err));
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