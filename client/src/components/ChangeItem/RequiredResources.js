/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, Panel, Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export default class RequiredResources extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resourcesRequired: []
        };

        this.populate = this.populate.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.populate(nextProps.changeItem);
    }

    populate(changeItem) {
        changeItem.resourcesRequired.forEach(resource => {
            this.state.resourcesRequired.push(
                <tr key={resource._id}>
                    <td>
                        <LinkContainer to={'/project/' + this.props.projectCode
                        + '/' + changeItem.changeTitle
                        + '/' + resource._id}>
                            <Button bsStyle="success">View</Button>
                        </LinkContainer>
                    </td>
                    <td>{resource.roleName}</td>
                    <td>{resource.grade}</td>
                    <td>{resource.totalManDays ? 'Impacted' : 'None'}</td>
                    <td>
                        <LinkContainer to={'/project/' + this.props.projectCode
                        + '/' + changeItem.changeTitle
                        + '/' + resource._i + '/forecastResource'}>
                            <Button bsStyle="success">Assign</Button>
                        </LinkContainer>
                    </td>
                </tr>
            )
        })
    }


    render() {
        return (
            <Panel header="Required Resources">
                <Table striped hover responsive>
                    <thead>
                    <tr>
                        <th/>
                        <th>Role Name</th>
                        <th>Grade</th>
                        <th>Impact</th>
                        <th>Forecasted Resource</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.resourcesRequired}
                    </tbody>
                </Table>
            </Panel>
        )
    }
}