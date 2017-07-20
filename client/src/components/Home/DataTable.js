import React, {Component} from 'react';
import {Alert, Button, Col, Glyphicon, Panel, Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router';

class DataRow extends Component {
    render() {
        return (
            <tr>
                <LinkContainer to={'/project/' + this.props.dataItem.projectCode}>
                    <Button bsStyle="success"><Glyphicon glyph="eye-open"/></Button>
                </LinkContainer>
                <td>{this.props.dataItem.projectCode}</td>
                <td>{this.props.dataItem.projectTitle}</td>
                <td>
                    {this.props.dataItem.changeItems.map(changeItem =>
                        <div key={changeItem.changeTitle}>
                            <Link to={'/project/' + this.props.dataItem.projectCode + '/' + changeItem.changeTitle}>
                                {changeItem.changeTitle}
                            </Link>
                        </div>
                    )}
                </td>
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
                <Panel header={this.props.tableHeader}>
                    {dataRows.length ?
                        <Table striped hover responsive>
                            <thead>
                            <tr>
                                <th/>
                                <th>Project Code</th>
                                <th>Project Title</th>
                                <th>Change Items</th>
                            </tr>
                            </thead>
                            <tbody>
                            {dataRows}
                            </tbody>
                        </Table>
                        : <Alert bsStyle="danger" className="text-center">No items</Alert>
                    }
                </Panel>
            </Col>
        )
    }
}

module.exports = DataTable;