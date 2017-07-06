/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, Panel, Table} from 'react-bootstrap';

export default class RequiredResources extends Component
{
	render()
	{
		return (
			<Panel header={<div className="text-center">Required Resources</div>}>
				<Table striped hover responsive>
					<thead>
					<tr>
						<th>View/Edit</th>
						<th>Role Name</th>
						<th>Grade</th>
						<th>Impact</th>
						<th>Forecasted Resource</th>
					</tr>
					</thead>
					<tbody>
					<tr>
						<td>
							<Button href="/project/:projectCode/:changeItem/:resource"
							        bsStyle="success">View/Edit</Button>
						</td>
						<td>Placeholder</td>
						<td>Placeholder</td>
						<td>Placeholder</td>
						<td>
							<Button href="/project/:projectCode/:changeItem/:resource/forecastResource"
							        bsStyle="success">Assign</Button>
						</td>
					</tr>
					</tbody>
				</Table>
			</Panel>
		)
	}
}