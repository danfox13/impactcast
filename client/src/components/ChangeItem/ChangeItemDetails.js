/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, Col, Panel, Row} from 'react-bootstrap';

import DeleteModal from '../Shared/DeleteModal';

export default class ChangeItemDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeItem: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            changeItem: nextProps.changeItem
        });
    }

    render() {
        return (
            <Panel header={this.state.changeItem.changeTitle} bsStyle="primary">
                <Row>
                    <Col sm={4}>
                        <strong>Status:</strong> {this.state.changeItem.status}<br/><br/>
                        <strong>LID:</strong>&nbsp;
                        {new Date(this.state.changeItem.lid).toLocaleDateString()}
                        <br/><br/>
                    </Col>
                    <Col sm={4}>
                        <strong>Start Date:</strong>&nbsp;
                        {new Date(this.state.changeItem.startDate).toLocaleDateString()}
                        <br/><br/>
                        <strong>End Date:</strong>&nbsp;
                        {new Date(this.state.changeItem.endDate).toLocaleDateString()}
                        <br/><br/>
                    </Col>
                    <Col sm={4}>
                        <strong>Risks:</strong> {this.state.changeItem.risks}<br/><br/>
                        <strong>Assumptions:</strong> {this.state.changeItem.assumptions}<br/><br/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Button href={'/project/' + this.props.projectCode
                                    + '/' + this.state.changeItem.changeTitle + '/addRequiredResource'}
                                bsStyle="success" block>Add a Resource Requirement</Button>
                    </Col>
                    <Col sm={4}>
                        <Button href={'/project/' + this.props.projectCode
                                    + '/' + this.state.changeItem.changeTitle + '/update'}
                                bsStyle="success" block>Update Change Item Details</Button>
                    </Col>
                    <Col sm={4}>
                        <DeleteModal subjectType="Change Item"
                                     subjectRoute={'/project/' + this.props.projectCode
                                                + '/' + this.state.changeItem.changeTitle}
                                     subjectName={this.state.changeItem.changeTitle}/>
                    </Col>
                </Row>
            </Panel>
        )
    }
}