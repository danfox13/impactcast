/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, Glyphicon, Panel, Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class ResultRow extends Component {
    constructor(props) {
        super(props);

        this.assignResource = this.assignResource.bind(this);
    }

    assignResource() {
        let url = `http://localhost:3001/team/${this.props.teamName}/addToTeam/${this.props.resource._id}`;
        fetch(url);
    }

    render() {
        return (
            <tr>
                <LinkContainer to={`/team/${this.props.teamName}`} onClick={this.assignResource}>
                    <Button bsStyle="success"><Glyphicon glyph="plus"/></Button>
                </LinkContainer>
                <td>{this.props.resource.resourceName}</td>
                <td>{this.props.resource.role}</td>
            </tr>
        )
    }
}

export default class AddTeamResourceSearchResults extends Component {

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
            return <ResultRow key={resource._id} resource={resource} teamName={this.props.teamName}/>
        });

        return (
            <Panel header="Search Results" bsStyle="primary">
                <Table striped hover responsive>
                    <thead>
                    <tr>
                        <th/>
                        <th>Name</th>
                        <th>Job Title</th>
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