/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, Col, Panel, Row} from 'react-bootstrap';

import DeleteModal from '../Shared/DeleteModal';

export default class ChangeItemDetails extends Component {
    render() {
        return (
            <Panel header="Placeholder" bsStyle="primary">
                <Row>
                    <Col sm={4}>
                        <strong>Status:</strong> Placeholder<br/><br/>
                        <strong>LID:</strong> DD/MM/YYYY<br/><br/>
                    </Col>
                    <Col sm={4}>
                        <strong>Start Date:</strong> DD/MM/YYYY<br/><br/>
                        <strong>End Date:</strong> DD/MM/YYYY<br/><br/>
                    </Col>
                    <Col sm={4}>
                        <strong>Risks:</strong> Placeholder<br/><br/>
                        <strong>Assumptions:</strong> Placeholder<br/><br/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Button href={'/project/:projectCode/:changeItem/addRequiredResource'}
                                bsStyle="success" block>Add a Resource Requirement</Button>
                    </Col>
                    <Col sm={4}>
                        <Button href={'/project/:projectCode/:changeItem/update'}
                                bsStyle="success" block>Update Change Item Details</Button>
                    </Col>
                    <Col sm={4}>
                        <DeleteModal subjectType="Change Item"
                                     subjectRoute="/project/:projectCode/:changeItem"
                                     subjectName="Placeholder"/>
                    </Col>
                </Row>
            </Panel>
        )
    }
}