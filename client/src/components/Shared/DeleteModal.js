/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, Col, Glyphicon, Modal, Row} from 'react-bootstrap';
import {browserHistory} from 'react-router';

export default class DeleteModal extends Component {
    constructor() {
        super();
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
        this.deleteSubject = this.deleteSubject.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    toggle() {
        this.setState({modal: !this.state.modal})
    }

    deleteSubject() {
        let url = 'http://localhost:3001' + this.props.subjectRoute + '/delete';
        fetch(url).then(response => response.json())
            .then(this.handleRedirect)
            .catch(err => console.log(err));
    }

    handleRedirect(response) {
        if (response.result.route) {
            browserHistory.push(response.result.route);
        }
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
                                <Button bsStyle="success" onClick={this.deleteSubject} block>
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