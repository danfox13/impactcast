/**
 * @author - Artur Komoter
 */

import React from 'react';
import {Button,
		Col,
		ControlLabel,
		FormControl,
		FormGroup,
		Grid,
		Jumbotron,
		Row} from 'react-bootstrap';

export default function Login(props)
{
	return (
		<div>
			<br/>
			<Grid>
				<Row>
					<Col sm={12}>
						<Jumbotron>
							<h1>Welcome to ImpactCast</h1>
							<p>Please login to get started</p>
						</Jumbotron>
					</Col>
				</Row>
				<form>
					<Row>
						<Col sm={6}>
							<FormGroup controlId="email">
								<ControlLabel>E-mail address:</ControlLabel>
								<FormControl type="text"/>
							</FormGroup>
						</Col>
						<Col sm={6}>
							<FormGroup controlId="pwd">
								<ControlLabel>Password:</ControlLabel>
								<FormControl type="password"/>
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col sm={12}>
							<Button type="submit" bsStyle="success" bsSize="large" block>Login</Button>
						</Col>
					</Row>
				</form>
			</Grid>
		</div>
	)
}