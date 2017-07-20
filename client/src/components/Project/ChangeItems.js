/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Alert, Button, Panel, Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class ChangeItemRow extends Component {
    render() {
        return (
            <tr>
                <LinkContainer to={`/project/${this.props.projectCode}/${this.props.changeItem.changeTitle}`}>
                    <Button bsStyle="success">View</Button>
                </LinkContainer>
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