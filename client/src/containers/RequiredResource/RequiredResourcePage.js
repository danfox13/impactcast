/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';

import RequiredResourceDetails from '../../components/RequiredResource/RequiredResourceDetails';
import Impact from '../../components/RequiredResource/Impact';

export default class RequiredResourcePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            requiredResource: ''
        };
        this.loadData = this.loadData.bind(this);
    }

    componentWillMount() {
        this.loadData()
    }

    loadData() {
        let url = 'http://localhost:3001/project/' + this.props.params.projectCode
            + '/' + this.props.params.changeItem + '/' + this.props.params.resourceId;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    requiredResource: data.result.requiredResource
                });
            })
            .catch(err => console.log(err));
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