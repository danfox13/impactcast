/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Alert, Panel, Table} from 'react-bootstrap';
import {Link} from 'react-router';
import TableButton from '../Shared/TableButton';

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
                    <TableButton bsStyle="success" to={`/project/${this.props.projectCode}/${changeItem.changeTitle}/${resource._id}`}>
                        View
                    </TableButton>
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
                        <TableButton
                            bsStyle="success"
                            to={`/project/${this.props.projectCode}/${changeItem.changeTitle}/${resource._id}/forecastResource`}>
                            Assign
                        </TableButton>
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