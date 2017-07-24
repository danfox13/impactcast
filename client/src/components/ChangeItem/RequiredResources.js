/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Alert, Button, Panel, Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router';

export default class RequiredResources extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resourcesRequired: [],
            totalManDays: []
        };

        this.populate = this.populate.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.populate(nextProps.changeItem, nextProps.totalManDays);
    }

    populate(changeItem, totalManDays) {
        changeItem.resourcesRequired.forEach((resource, index) => {
            this.state.resourcesRequired.push(
                <tr key={resource._id}>
                    <LinkContainer to={`/project/${this.props.projectCode}/${changeItem.changeTitle}/${resource._id}`}>
                        <Button bsStyle="success">View</Button>
                    </LinkContainer>
                    <td>{resource.roleName}</td>
                    <td>{resource.grade}</td>
                    <td>{totalManDays[index] > 0 ? 'Y' : 'N'}</td>
                    {resource.forecastedResource ?
                        <td>
                            <Link to={`/resource/${resource.forecastedResource._id}`}>
                                {resource.forecastedResource.resourceName}
                            </Link>
                        </td>
                        :
                        <LinkContainer
                            to={`/project/${this.props.projectCode}/${changeItem.changeTitle}/${resource._id}/forecastResource`}>
                            <Button bsStyle="success">Assign</Button>
                        </LinkContainer>
                    }
                </tr>
            )
        })
    }


    render() {
        return (
            <Panel header="Required Resources">
                { this.state.resourcesRequired.length ?
                    <Table striped hover responsive>
                        <thead>
                        <tr>
                            <th/>
                            <th>Role Name</th>
                            <th>Grade</th>
                            <th>Impacted?</th>
                            <th>Forecasted Resource</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.resourcesRequired}
                        </tbody>
                    </Table>
                    : <Alert bsStyle="danger">No required resources</Alert>
                }
            </Panel>
        )
    }
}