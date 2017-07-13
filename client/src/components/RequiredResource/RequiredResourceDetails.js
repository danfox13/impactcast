/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, Col, Panel, Row} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import DeleteModal from '../Shared/DeleteModal';

export default class RequiredResourceDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requiredResource: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            requiredResource: nextProps.requiredResource
        });
    }

    render() {
        return (
            <Panel header={this.state.requiredResource.roleName + ' for ' + this.props.changeItem}
                   bsStyle="primary">
                <Row>
                    <Col sm={4}>
                        <strong>P-Line:</strong> {this.state.requiredResource.pLine} <br/><br/>
                        <strong>Company:</strong> {this.state.requiredResource.company} <br/><br/>
                        <strong>Resource Type:</strong> {this.state.requiredResource.resourceType}
                        <br/><br/>
                        <strong>Grade:</strong> {this.state.requiredResource.grade} <br/><br/>
                    </Col>
                    <Col sm={4}>
                        <strong>Stage:</strong> {this.state.requiredResource.stage} <br/><br/>
                        <strong>Job Code:</strong> {this.state.requiredResource.jobCode} <br/><br/>
                        <strong>System:</strong> {this.state.requiredResource.system} <br/><br/>
                    </Col>
                    <Col sm={4}>
                        <strong>Component:</strong> {this.state.requiredResource.component} <br/><br/>
                        <strong>Pricing Flag:</strong> {this.state.requiredResource.pricingFlag}
                        <br/><br/>
                        <strong>Reason:</strong> {this.state.requiredResource.reason} <br/><br/>
                    </Col>
                </Row>
                <Row>
                    <br/>
                    <Col sm={6}>
                        <LinkContainer to={'/project/' + this.props.projectCode
                                         + '/' + this.props.changeItem
                                         + '/' + this.state.requiredResource._id + '/update'}>
                            <Button bsStyle="success" block>Edit Details</Button>
                        </LinkContainer>
                    </Col>
                    <Col sm={6}>
                        <DeleteModal subjectType="Required Resource"
                                     subjectRoute={'/project/' + this.props.projectCode
                                                 + '/' + this.props.changeItem
                                                 + '/' + this.state.requiredResource._id}
                                     subjectName={this.state.requiredResource.roleName}/>
                    </Col>
                </Row>
            </Panel>
        )
    }
}