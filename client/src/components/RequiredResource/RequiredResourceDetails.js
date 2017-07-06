/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, Col, Grid, Panel, Row} from 'react-bootstrap';
import DeleteModal from '../Shared/DeleteModal';

export default class RequiredResourceDetails extends Component {
	render() {
		return (
			<Panel header={<div className="text-center">Placeholder</div>}>
				<Grid>
					<Row>
						<Col sm={4}>
							<strong>P-Line:</strong> Placeholder <br/><br/>
							<strong>Company:</strong> Placeholder <br/><br/>
							<strong>Resource Type:</strong> Placeholder <br/><br/>
							<strong>Grade:</strong> Placeholder <br/><br/>
						</Col>
						<Col sm={4}>
							<strong>Stage:</strong> Placeholder <br/><br/>
							<strong>Job Code:</strong> Placeholder <br/><br/>
							<strong>System:</strong> Placeholder <br/><br/>
						</Col>
						<Col sm={4}>
							<strong>Component:</strong> Placeholder <br/><br/>
							<strong>Pricing Flag:</strong> Placeholder <br/><br/>
							<strong>Reason:</strong> Placeholder <br/><br/>
						</Col>
					</Row>
					<Row>
						<br/>
						<Col sm={6}>
							<Button href="/project/:projectCode/:changeItem/:requiredResource/update"
							        bsStyle="success" block>Edit Details</Button>
						</Col>
						<Col sm={5}>
							<DeleteModal subjectType="Required Resource"
							             subjectRoute="/project/:projectCode/:changeItem/:requiredResource"
							             subjectName="Placeholder"/>
						</Col>
					</Row>
				</Grid>
			</Panel>
		)
	}
}