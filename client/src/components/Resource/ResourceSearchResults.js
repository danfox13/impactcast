/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Alert, Button, Panel, Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class ResultRow extends Component {
    render() {
        return (
            <tr>
                <LinkContainer to={'/resource/' + this.props.resource._id}>
                    <Button bsStyle="success">View</Button>
                </LinkContainer>
                <td>{this.props.resource.resourceName}</td>
                <td>{this.props.resource.role}</td>
            </tr>
        )
    }
}

export default class ResourceSearchResults extends Component {

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
            return <ResultRow key={resource._id} resource={resource}/>
        });

        return (
            <Panel header="Search Results" bsStyle="primary">
                { resultRows.length ?
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
                    : <Alert bsStyle="danger">Nothing found</Alert>
                }
            </Panel>
        )
    }
}