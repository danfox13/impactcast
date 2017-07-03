/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';
import Heading from '../components/Home/Heading';
import StatusItems from '../components/Home/StatusItems';
import DataTable from '../components/Home/DataTable';

export default class HomePage extends Component
{
	render() {
		return (
			<div>
				<div>
					<Heading />
					<StatusItems />
					<div className="row">
						<DataTable
							tableHeader="New Items"
							viewLink="#"
							itemLink="#"
							changeItem="Network Changes"
							projectCode="BANK"
							projectTitle="Banking System Upgrade"
						/>
						<DataTable
							tableHeader="Ready to Impact"
							viewLink="#"
							itemLink="#"
							projectCode="BANK"
							changeItem="Back End Changes"
							projectTitle="Banking System Upgrade"
						/>
					</div>
					<div className="row">
						<DataTable
							tableHeader="Rejected Impacts"
							viewLink="#"
							itemLink="#"
							projectCode=""
							changeItem=""
							projectTitle=""
						/>
						<DataTable
							tableHeader="Ready to Forecast"
							viewLink="#"
							itemLink="#"
							projectCode="BANK"
							changeItem="Banking System Upgrade"
							projectTitle="UI Changes"
						/>
					</div>
				</div>
			</div>
		)
	}
}

