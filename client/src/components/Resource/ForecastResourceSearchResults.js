/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, Panel, Table} from 'react-bootstrap';

class ResultRow extends Component {
    render() {
        return (
            <tr>
                <td>
                    <Button href="/project/:projectCode/:changeItem/:requiredResource/assign/:resource"
                            bsStyle="success">Assign
                    </Button>
                </td>
                <td>Placeholder</td>
                <td>Placeholder</td>
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
        // let resultRows = this.state.results.map(function (resource) {
        // 	return <ResultRow key={resource._id} resource={resource}/>
        // });
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
                    <ResultRow/>
                    </tbody>
                </Table>
            </Panel>
        )
    }
}