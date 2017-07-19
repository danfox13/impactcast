/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, Panel, Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class ResultRow extends Component {
    constructor(props) {
        super(props);

        this.assignResource = this.assignResource.bind(this);
    }

    assignResource() {
        let url = `http://localhost:3001/project/${this.props.projectCode}/${this.props.changeItem}/${this.props.reqResourceId}/assign/${this.props.resource._id}`;
        fetch(url);
    }

    render() {
        return (
            <tr>
                <td>{this.props.resource.resourceName}</td>
                <td>{this.props.resource.role}</td>
                <LinkContainer to={`/project/${this.props.projectCode}/${this.props.changeItem}`} onClick={this.assignResource}>
                    <Button bsStyle="success">Assign</Button>
                </LinkContainer>
            </tr>
        )
    }
}

export default class ForecastResourceSearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: this.props.searchResults
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            results: nextProps.searchResults
        });
    }

    render() {
        let resultRows = this.state.results.map(resource => {
            return <ResultRow key={resource._id} resource={resource} projectCode={this.props.projectCode}
                              changeItem={this.props.changeItem} reqResourceId={this.props.reqResourceId}/>
        });

        return (
            <Panel header="Search Results" bsStyle="primary">
                <Table striped hover responsive>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Job Title</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {resultRows}
                    </tbody>
                </Table>
            </Panel>
        )
    }
}