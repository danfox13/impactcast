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
					{this.props.changeItems.map(changeItem =>
						<tr>
							<td>
								<Button
									href={'/project/' + this.props.projectCode + '/' + changeItem.changeTitle}
									bsStyle="success">View
								</Button>
							</td>
							<td>{changeItem.changeTitle}</td>
							<td>{changeItem.status}</td>
							<td>
								{changeItem.lid.getDate() + '/' +
								(changeItem.lid.getMonth() + 1) + '/' +
								changeItem.lid.getFullYear()}
							</td>
						</tr>
					)}
					</tbody>
				</Table>
			</Panel>
		)
	}
}