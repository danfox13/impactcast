/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, Col, Grid, Panel, Row} from 'react-bootstrap';

import DeleteProject from '../../components/Project/DeleteProject';

export default class ProjectDetails extends Component
{
	render()
	{
		return (
			<Panel header={<div className="text-center">Placeholder</div>}>
				<Grid>
					<Row>
						<Col sm={12}>
							<strong>Project Code:</strong> Placeholder <br/><br/>
						</Col>
					</Row>
					<Row>
						<Col sm={4}>
							<Button href="/project/:projectCode/newChangeItem"
							        bsStyle="success" block>Add a Change Item</Button>
						</Col>
						<Col sm={4}>
							<Button href="/project/:projectCode/update"
							        bsStyle="success" block>Edit Project Details</Button>
						</Col>
						<DeleteProject/>
					</Row>
				</Grid>
			</Panel>
		)
	}
}
