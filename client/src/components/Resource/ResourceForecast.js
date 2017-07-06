import React, {Component} from 'react';

export default class ResourceDetails extends Component {
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
							<div className="panel-heading text-cente"><h3>Six Month Forecast</h3></div>
							<div className="panel-body">
								<ul className="nav nav-tabs">
									<li className="active"><a data-toggle="tab"
									                          href="#currentMonth"> { this.getCurrentMonth() } </a></li>
									<li><a data-toggle="tab" href="#monthPlusOne"> { this.getMonthFromNow(1) } </a></li>
									<li><a data-toggle="tab" href="#monthPlusTwo"> { this.getMonthFromNow(2) } </a></li>
									<li><a data-toggle="tab" href="#monthPlusThree"> { this.getMonthFromNow(3) } </a>
									</li>
									<li><a data-toggle="tab" href="#monthPlusFour"> { this.getMonthFromNow(4) } </a>
									</li>
									<li><a data-toggle="tab" href="#monthPlusFive"> { this.getMonthFromNow(5) } </a>
									</li>
									<li><a data-toggle="tab" href="#monthPlusSix"> { this.getMonthFromNow(6) } </a></li>
								</ul>

								<div className="tab-content">
									<div id="currentMonth" className="tab-pane fade in active">
										<div className="table-responsive">
											<br/>
											<table className="table table-striped table-hover">
												<thead>
												<tr>
													<th>Project</th>
													<th>Change Item</th>
													<th>Role</th>
													<th>Days</th>
												</tr>
												</thead>
												<tbody>
												<tr>
													<td><a href="/project/<%= project.projectCode %>">
														Some Project
													</a></td>
													<td><a
														href="/project/<%= project.projectCode %>/<%= changeItem.changeTitle %>">
														Some Change Item
													</a></td>
													<td>
														<a href="/project/<%= project.projectCode %>/<%= changeItem.changeTitle %>/<%= changeItem.resourcesRequired._id %>">
															Some Role Name
														</a></td>
													<td>Some Imapact Days</td>
													Some Total Days
												</tr>
												</tbody>
											</table>
											<div className="alert alert-danger">
												<strong>Under Forecasted by 10 Days!</strong>
											</div>
										</div>
									</div>
									<div id="monthPlusOne" className="tab-pane fade">
										<div className="table-responsive">
											<br/>
											<table className="table table-striped table-hover">
												<thead>
												<tr>
													<th>Project</th>
													<th>Change Item</th>
													<th>Role</th>
													<th>Days</th>
												</tr>
												</thead>
												<tbody>
												<tr>
													<td><a href="/project/<%= project.projectCode %>">
														Some Project
													</a></td>
													<td><a
														href="/project/<%= project.projectCode %>/<%= changeItem.changeTitle %>">
														Some Change Item
													</a></td>
													<td>
														<a href="/project/<%= project.projectCode %>/<%= changeItem.changeTitle %>/<%= changeItem.resourcesRequired._id %>">
															Some Role Name
														</a></td>
													<td>Some Imapact Days</td>
													Some Total Days
												</tr>
												</tbody>
											</table>
											<div className="alert alert-danger">
												<strong>Under Forecasted by 10 Days!</strong>
											</div>
										</div>
									</div>
									<div id="monthPlusTwo" className="tab-pane fade">
										<div className="table-responsive">
											<br/>
											<table className="table table-striped table-hover">
												<thead>
												<tr>
													<th>Project</th>
													<th>Change Item</th>
													<th>Role</th>
													<th>Days</th>
												</tr>
												</thead>
												<tbody>
												<tr>
													<td><a href="/project/<%= project.projectCode %>">
														Some Project
													</a></td>
													<td><a
														href="/project/<%= project.projectCode %>/<%= changeItem.changeTitle %>">
														Some Change Item
													</a></td>
													<td>
														<a href="/project/<%= project.projectCode %>/<%= changeItem.changeTitle %>/<%= changeItem.resourcesRequired._id %>">
															Some Role Name
														</a></td>
													<td>Some Imapact Days</td>
													Some Total Days
												</tr>
												</tbody>
											</table>
											<div className="alert alert-danger">
												<strong>Under Forecasted by 10 Days!</strong>
											</div>
										</div>
									</div>
									<div id="monthPlusThree" className="tab-pane fade">
										<div className="table-responsive">
											<br/>
											<table className="table table-striped table-hover">
												<thead>
												<tr>
													<th>Project</th>
													<th>Change Item</th>
													<th>Role</th>
													<th>Days</th>
												</tr>
												</thead>
												<tbody>
												<tr>
													<td><a href="/project/<%= project.projectCode %>">
														Some Project
													</a></td>
													<td><a
														href="/project/<%= project.projectCode %>/<%= changeItem.changeTitle %>">
														Some Change Item
													</a></td>
													<td>
														<a href="/project/<%= project.projectCode %>/<%= changeItem.changeTitle %>/<%= changeItem.resourcesRequired._id %>">
															Some Role Name
														</a></td>
													<td>Some Imapact Days</td>
													Some Total Days
												</tr>
												</tbody>
											</table>
											<div className="alert alert-danger">
												<strong>Under Forecasted by 10 Days!</strong>
											</div>
										</div>
									</div>
									<div id="monthPlusFour" className="tab-pane fade">
										<div className="table-responsive">
											<br/>
											<table className="table table-striped table-hover">
												<thead>
												<tr>
													<th>Project</th>
													<th>Change Item</th>
													<th>Role</th>
													<th>Days</th>
												</tr>
												</thead>
												<tbody>
												<tr>
													<td><a href="/project/<%= project.projectCode %>">
														Some Project
													</a></td>
													<td><a
														href="/project/<%= project.projectCode %>/<%= changeItem.changeTitle %>">
														Some Change Item
													</a></td>
													<td>
														<a href="/project/<%= project.projectCode %>/<%= changeItem.changeTitle %>/<%= changeItem.resourcesRequired._id %>">
															Some Role Name
														</a></td>
													<td>Some Imapact Days</td>
													Some Total Days
												</tr>
												</tbody>
											</table>
											<div className="alert alert-danger">
												<strong>Under Forecasted by 10 Days!</strong>
											</div>
										</div>
									</div>
									<div id="monthPlusFive" className="tab-pane fade">
										<div className="table-responsive">
											<br/>
											<table className="table table-striped table-hover">
												<thead>
												<tr>
													<th>Project</th>
													<th>Change Item</th>
													<th>Role</th>
													<th>Days</th>
												</tr>
												</thead>
												<tbody>
												<tr>
													<td><a href="/project/<%= project.projectCode %>">
														Some Project
													</a></td>
													<td><a
														href="/project/<%= project.projectCode %>/<%= changeItem.changeTitle %>">
														Some Change Item
													</a></td>
													<td>
														<a href="/project/<%= project.projectCode %>/<%= changeItem.changeTitle %>/<%= changeItem.resourcesRequired._id %>">
															Some Role Name
														</a></td>
													<td>Some Imapact Days</td>
													Some Total Days
												</tr>
												</tbody>
											</table>
											<div className="alert alert-danger">
												<strong>Under Forecasted by 10 Days!</strong>
											</div>
										</div>
									</div>
									<div id="monthPlusSix" className="tab-pane fade">
										<div className="table-responsive">
											<br/>
											<table className="table table-striped table-hover">
												<thead>
												<tr>
													<th>Project</th>
													<th>Change Item</th>
													<th>Role</th>
													<th>Days</th>
												</tr>
												</thead>
												<tbody>
												<tr>
													<td><a href="/project/<%= project.projectCode %>">
														Some Project
													</a></td>
													<td><a
														href="/project/<%= project.projectCode %>/<%= changeItem.changeTitle %>">
														Some Change Item
													</a></td>
													<td>
														<a href="/project/<%= project.projectCode %>/<%= changeItem.changeTitle %>/<%= changeItem.resourcesRequired._id %>">
															Some Role Name
														</a></td>
													<td>Some Imapact Days</td>
													Some Total Days
												</tr>
												</tbody>
											</table>
											<div className="alert alert-danger">
												<strong>Under Forecasted by 10 Days!</strong>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}