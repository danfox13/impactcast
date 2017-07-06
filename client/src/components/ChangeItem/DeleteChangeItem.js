/**
 * @author: Artur Komoter
 */

import React, { Component } from 'react';
import {Button, Col, Glyphicon, Modal, Row} from 'react-bootstrap';

export default class DeleteChangeItem extends Component
{
	constructor()
	{
		super();
		this.state = {
			deleteChangeItemModal: false
		};

		this.toggleDeleteChangeItemModal = this.toggleDeleteChangeItemModal.bind(this);
	}

	toggleDeleteChangeItemModal()
	{
		this.setState({deleteChangeItemModal: !this.state.deleteChangeItemModal})
	}

	render()
	{
		return (
			<Col sm={3}>
				<Button bsStyle="danger" block
				        onClick={this.toggleDeleteChangeItemModal}>Delete
				</Button>
				<Modal show={this.state.deleteChangeItemModal}
				       onHide={this.toggleDeleteChangeItemModal}>
					<Modal.Header>
						<Modal.Title><Glyphicon glyph="remove"/> Remove Change Item</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h5>Are you sure you want to remove Placeholder?</h5>
					</Modal.Body>
					<Modal.Footer>
						<Row>
							<Col sm={6}>
								<Button
									href={'/project/changeItem/delete'}
									bsStyle="success" block>
									<Glyphicon glyph="ok"/> Yes
								</Button>
							</Col>
							<Col sm={6}>
								<Button type="submit"
								        bsStyle="danger" block
								        onClick={this.toggleDeleteChangeItemModal}>
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