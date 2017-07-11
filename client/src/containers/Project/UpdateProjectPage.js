/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import UpdateProject from '../../components/Project/UpdateProject';

export default class UpdateProjectPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectTitle: ''
        };

        this.loadData = this.loadData.bind(this);
    }

    componentWillMount() {
        this.loadData()
    }

    loadData() {
        let url = 'http://localhost:3001/project/' + this.props.params.projectCode + '/update';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    projectTitle: data.result.projectTitle
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <UpdateProject projectCode={this.props.params.projectCode}
                           projectTitle={this.state.projectTitle}/>
        )
    }
}