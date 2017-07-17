/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, Panel, Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export default class ChangeItems extends Component {

    render() {
        return (
            <Panel header="Attached Change Items">
                <Table striped hover responsive>
                    <thead>
                    <tr>
                        <th/>
                        <th>Name</th>
                        <th>Status</th>
                        <th>LID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.changeItems.map(changeItem => {
                        return (
                            <tr key={changeItem.changeTitle}>
                                <LinkContainer to={'/project/' + this.props.projectCode + '/'
                                + changeItem.changeTitle}>
                                    <Button bsStyle="success">View</Button>
                                </LinkContainer>
                                <td>{changeItem.changeTitle}</td>
                                <td>{changeItem.status}</td>
                                <td>{new Date(changeItem.lid).toLocaleDateString('en-GB')}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </Panel>
        )
    }
}