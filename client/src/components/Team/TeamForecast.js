/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';

export default class TeamForecast extends Component {
	constructor() {
		super();
		this.state = {
			today: new Date(),
			month: [
				' January',
				' February',
				' March',
				' April',
				' May',
				' June',
				' July',
				' August',
				' September',
				' October',
				' November',
				' December'
			]
		};

		this.getFormattedMonth = this.getFormattedMonth.bind(this);
		this.getMonthFromNow = this.getMonthFromNow.bind(this);
		this.getCurrentMonth = this.getCurrentMonth.bind(this);
	}

	getCurrentMonth() {
		return this.getFormattedMonth(this.state.today.getMonth());
	}

	getMonthFromNow(monthFromNow) {
		return this.getFormattedMonth(this.state.today.getMonth() + monthFromNow);
	}

	getFormattedMonth(month) {
		return this.state.month[month % 12];
	}

	render() {
		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="container">
						<div className="panel panel-default">
							<div className="panel-heading text-cente"><h3>Six Month Forecast Delta</h3></div>
							<div className="panel-body">
								<div className=" table-responsive ">
									<br/>
									<table className=" table table-striped table-hover table-bordered">
										<thead>
										<tr>
											<th colSpan="1" className="text-center col-md-1">Name</th>
											<th colSpan="1"
											    className="text-center col-md-1"> { this.getCurrentMonth() } </th>
											<th colSpan="1"
											    className="text-center col-md-1"> { this.getMonthFromNow(1) } </th>
											<th colSpan="1"
											    className="text-center col-md-1"> { this.getMonthFromNow(2) } </th>
											<th colSpan="1"
											    className="text-center col-md-1"> { this.getMonthFromNow(3) } </th>
											<th colSpan="1"
											    className="text-center col-md-1"> { this.getMonthFromNow(4) } </th>
											<th colSpan="1"
											    className="text-center col-md-1"> { this.getMonthFromNow(5) } </th>
											<th colSpan="1"
											    className="text-center col-md-1"> { this.getMonthFromNow(6) } </th>
										</tr>
										</thead>
										<tbody>
										<tr>
											<td><a href="/resource/1">Test Member</a></td>
											<td>
												<p className="bg-danger text-center">-22</p>
											</td>
											<td>
												<p className="bg-danger text-center">-21</p>
											</td>
											<td>
												<p className="bg-danger text-center">-23</p>
											</td>
											<td>
												<p className="bg-danger text-center">-21</p>
											</td>
											<td>
												<p className="bg-danger text-center">-22</p>
											</td>
											<td>
												<p className="bg-danger text-center">-22</p>
											</td>
											<td>
												<p className="bg-danger text-center">-21</p>
											</td>
										</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}