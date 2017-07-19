/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, Col, Glyphicon, Modal, Row} from 'react-bootstrap';

export default class DeleteModal extends Component {
    constructor() {
        super();
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({modal: !this.state.modal})
    }

    render() {
        return (
            <div>
                <Button bsStyle="danger" block onClick={this.toggle}>Delete</Button>
                <Modal show={this.state.modal} onHide={this.toggle}>
                    <Modal.Header>
                        <Modal.Title>
                            <Glyphicon glyph="remove"/> Remove {this.props.subjectType}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Are you sure you want to remove {this.props.subjectName}?</h5>
                    </Modal.Body>
                    <Modal.Footer>
                        <Row>
                            <Col sm={6}>
                                <Button
                                    href={this.props.subjectRoute + '/delete'}
                                    bsStyle="success" block>
                                    <Glyphicon glyph="ok"/> Yes
                                </Button>
                            </Col>
                            <Col sm={6}>
                                <Button type="submit"
                                        bsStyle="danger" block
                                        onClick={this.toggle}>
                                    <Glyphicon glyph="remove"/> No
                                </Button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}