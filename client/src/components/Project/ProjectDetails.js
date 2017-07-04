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
			<Panel>
				<h1 className="text-center">{this.props.projectTitle}</h1>
				<Grid>
					<Row>
						<Col sm={12}>
							<strong>Project Code:</strong> {this.props.projectCode} <br/><br/>
						</Col>
					</Row>
					<Row>
						<Col sm={4}>
							<Button href={'/project/' + this.props.projectCode + '/newChangeItem'}
							        bsStyle="success" block>Add a Change Item</Button>
						</Col>
						<Col sm={4}>
							<Button href={'/project/' + this.props.projectCode + '/update'}
							        bsStyle="success" block>Edit Project Details</Button>
						</Col>
						<DeleteProject projectCode={this.props.projectCode}/>
					</Row>
				</Grid>
			</Panel>
		)
	}
}
