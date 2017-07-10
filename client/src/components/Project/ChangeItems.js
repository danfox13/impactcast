/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, Panel, Table} from 'react-bootstrap';

class DataRow extends Component {
    render() {
        let date = new Date(this.props.dataItem.lid);

        return (
            <tr>
                <td>
                    <Button href={'/project/' + this.props.projectCode + '/'
                    + this.props.dataItem.changeTitle} bsStyle="success">View</Button>
                </td>
                <td>{this.props.dataItem.changeTitle}</td>
                <td>{this.props.dataItem.status}</td>
                <td>{date.getDay() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()}</td>
            </tr>
        )
    }
}

export default class ChangeItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeItems: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            changeItems: nextProps.changeItems
        });
    }

    render() {
        let dataRows = this.state.changeItems.map(function (changeItem) {
            return <DataRow key={changeItem._id} dataItem={changeItem}
                            projectCode={this.props.projectCode}/>
        });

        return (
            <Panel header={<h3 className="text-center">Attached Change Items</h3>}>
                <Table striped hover responsive>
                    <thead>
                    <tr>
                        <th>View</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>LID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dataRows}
                    </tbody>
                </Table>
            </Panel>
        )
    }
}