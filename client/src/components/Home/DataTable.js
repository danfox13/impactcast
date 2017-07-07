import React, {Component} from 'react';
import {Button, Col, Panel, Table} from 'react-bootstrap';

class DataRow extends Component {
    render() {
        return (
            <tr>
                <td>
                    <Button bsStyle="success"
                            href={'/project/' + this.props.dataItem.projectCode}>
                        View
                    </Button>
                </td>
                <td>{this.props.dataItem.projectCode}</td>
                <td>{this.props.dataItem.projectTitle}</td>
                {this.props.dataItem.changeItems.map(changeItem =>
                    <td key={changeItem.changeTitle}>
                        <a href={'/project/' + this.props.dataItem.projectCode + '/' + changeItem.changeTitle}>
                            {changeItem.changeTitle}
                        </a><br/>
                    </td>
                )}
            </tr>
        )
    }
}

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataItems: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataItems: nextProps.dataItems
        });
    }

    render() {
        let dataRows = this.state.dataItems.map(function (dataItem) {
            return <DataRow key={dataItem._id} dataItem={dataItem}/>
        });

        return (
            <Col sm={6}>
                <Panel header={<div className="text-center">{this.props.tableHeader}</div>}>
                    <Table striped hover responsive>
                        <thead>
                        <tr>
                            <th>View Project</th>
                            <th>Project Code</th>
                            <th>Project Title</th>
                            <th>Change Items</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dataRows}
                        </tbody>
                    </Table>
                </Panel>
            </Col>
        )
    }
}

module.exports = DataTable;