/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, Col, Panel, Row} from 'react-bootstrap';

import DeleteModal from '../Shared/DeleteModal';

export default class ProjectDetails extends Component {
    render() {
        return (
            <Panel header={this.props.projectTitle} bsStyle="primary">
                <Row>
                    <Col sm={12}>
                        <strong>Project Code:</strong> {this.props.projectCode} <br/><br/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Button href={'/project/' + this.props.projectCode + '/newChangeItem'}
                                bsStyle="success" block>Add a Change Item</Button>
                    </Col>
                    <Col sm={4}>
                        <Button href={'/project/' + this.props.projectCode + '/update'}
                                bsStyle="success" block>Edit Project Details</Button>
                    </Col>
                    <Col sm={4}>
                        <DeleteModal subjectType="Project"
                                     subjectRoute={'/project/' + this.props.projectCode}
                                     subjectName={this.props.projectTitle}/>
                    </Col>
                </Row>
            </Panel>
        )
    }
}
