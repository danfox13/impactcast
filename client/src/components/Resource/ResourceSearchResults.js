/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Alert, Panel, Table} from 'react-bootstrap';
import TableButton from '../Shared/TableButton';

class ResultRow extends Component {
    render() {
        return (
            <tr>
                <TableButton bsStyle="success" to={`/resource/${this.props.resource._id}`}>
                    View
                </TableButton>
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