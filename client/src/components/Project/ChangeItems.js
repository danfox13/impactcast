/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, Panel, Table} from 'react-bootstrap';

export default class ChangeItems extends Component
{
	render()
	{
		return (
			<Panel header={<h3 className="text-center">Attached Change Items</h3>}>
				<Table striped hover responsive>
					<thead>
					<tr>
						<th>View</th>
						<th>Name</th>
						<th>Status</th>
						<th>LID</th>
					</tr>
					</thead>
					<tbody>
					<tr>
						<td>
							<Button href="/project/:projectCode/:changeItem" bsStyle="success">View</Button>
						</td>
						<td>Placeholder</td>
						<td>Placeholder</td>
						<td>DD/MM/YYYY</td>
					</tr>
					</tbody>
				</Table>
			</Panel>
		)
	}
}