/**
 * @author: Artur Komoter
 */

import React, { Component } from 'react';
import {Button, Col, Glyphicon, Modal, Row} from 'react-bootstrap';

export default class DeleteProject extends Component
{
	constructor()
	{
		super();
		this.state = {
			deleteProjectModal: false
		};

		this.toggleDeleteProjectModal = this.toggleDeleteProjectModal.bind(this);
	}

	toggleDeleteProjectModal()
	{
		this.setState({deleteProjectModal: !this.state.deleteProjectModal})
	}

	render()
	{
		return (
			<Col sm={3}>
				<Button bsStyle="danger" block
				        onClick={this.toggleDeleteProjectModal}>Delete
				</Button>
				<Modal show={this.state.deleteProjectModal}
				       onHide={this.toggleDeleteProjectModal}>
					<Modal.Header>
						<Modal.Title><Glyphicon glyph="remove"/> Remove Project</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h5>Are you sure you want to remove Placeholder?</h5>
					</Modal.Body>
					<Modal.Footer>
						<Row>
							<Col sm={6}>
								<Button
									href="/project/:projectCode/delete"
									bsStyle="success" block>
									<Glyphicon glyph="ok"/> Yes
								</Button>
							</Col>
							<Col sm={6}>
								<Button type="submit"
								        bsStyle="danger" block
								        onClick={this.toggleDeleteProjectModal}>
									<Glyphicon glyph="remove"/> No
								</Button>
							</Col>
						</Row>
					</Modal.Footer>
				</Modal>
			</Col>
		)
	}
}