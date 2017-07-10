import React, {Component} from 'react';
import {Button, Col, Panel, Row} from 'react-bootstrap';
import DeleteModal from '../Shared/DeleteModal';

export default class ResourceDetails extends Component {
    render() {
        return (
            <Panel header="Placeholder" bsStyle="primary">
                <Row>
                    <Col sm={6}>
                        <strong>Employee ID: </strong>Placeholder<br/><br/>
                        <strong>Location: </strong>Placeholder<br/><br/>
                    </Col>
                    <Col sm={6}>
                        <strong>Email: </strong>Placeholder<br/><br/>
                        <strong>Job Title: </strong>Placeholder<br/><br/>
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <Button href="/resource/:resourceName/update" bsStyle="success"
                                block>Edit Details</Button>
                    </Col>
                    <Col sm={6}>
                        <DeleteModal subjectType="Resource"
                                     subjectRoute="/resource/:resourceName"
                                     subjectName="Placeholder"/>
                    </Col>
                </Row>
            </Panel>
        )
    }
}