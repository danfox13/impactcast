/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, Panel, Table} from 'react-bootstrap';

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
                                <td>
                                    <Button href={'/project/' + this.props.projectCode + '/'
                                    + changeItem.changeTitle} bsStyle="success">View</Button>
                                </td>
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