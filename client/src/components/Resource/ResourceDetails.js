import React, {Component} from 'react';
import {Button, Col, Panel, Row} from 'react-bootstrap';
import DeleteModal from '../Shared/DeleteModal';
import {LinkContainer} from 'react-router-bootstrap';

export default class ResourceDetails extends Component {
    render() {
        return (
            <Panel header={this.props.resource.resourceName} bsStyle="primary">
                <Row>
                    <Col sm={6}>
                        <strong>Employee ID: </strong>{this.props.resource.employeeId}<br/><br/>
                        <strong>Location: </strong>{this.props.resource.location}<br/><br/>
                    </Col>
                    <Col sm={6}>
                        <strong>Email: </strong>{this.props.resource.email}<br/><br/>
                        <strong>Job Title: </strong>{this.props.resource.role}<br/><br/>
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <LinkContainer to={'/resource/' + this.props.resource._id + '/update'}>
                            <Button bsStyle="success" block>Edit Details</Button>
                        </LinkContainer>
                    </Col>
                    <Col sm={6}>
                        <DeleteModal subjectType="Resource"
                                     subjectRoute={'/resource/' + this.props.resource._id}
                                     subjectName={this.props.resource.resourceName}/>
                    </Col>
                </Row>
            </Panel>
        )
    }
}