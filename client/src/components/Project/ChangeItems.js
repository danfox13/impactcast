/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Alert, Panel, Table} from 'react-bootstrap';
import TableButton from '../Shared/TableButton';

class ChangeItemRow extends Component {
    render() {
        return (
            <tr>
                <TableButton bsStyle="success" to={`/project/${this.props.projectCode}/${this.props.changeItem.changeTitle}`}>
                    View
                </TableButton>
                <td>{this.props.changeItem.changeTitle}</td>
                <td>{this.props.changeItem.status}</td>
                <td>{new Date(this.props.changeItem.lid).toLocaleDateString('en-GB')}</td>
            </tr>
        )
    }
}

export default class ChangeItems extends Component {

    render() {
        let dataRows = this.props.changeItems.map(changeItem => {
            return <ChangeItemRow key={changeItem._id} changeItem={changeItem} projectCode={this.props.projectCode}/>
        });

        return (
            <Panel header="Attached Change Items">
                {dataRows.length ?
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
                        {dataRows}
                        </tbody>
                    </Table>
                    : <Alert bsStyle="danger">No change items</Alert>
                }
            </Panel>
        )
    }
}