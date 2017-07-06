import React, {Component} from 'react';

export default class SearchProjectAndChangeItems extends Component {
	constructor() {
		super();
		this.state = {
			projectCode: '',
			projectTitle: '',
			changeItemTitle: '',
			changeItemStatus: '',
		};

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	render() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading text-cente"><h1>Search Projects</h1></div>
				<div className="panel-body">
					<div className="form-group">
						<label htmlFor="projectCode">Project Code:</label>
						<input type="text" className="form-control" id="projectCode" name="projectCode"
						       value={this.state.projectCode} onChange={this.handleInputChange}/>
					</div>

					<div className="form-group">
						<label htmlFor="projectTitle">Name:</label>
						<input type="text" className="form-control" id="projectTitle" name="projectTitle"
						       value={this.state.projectTitle} onChange={this.handleInputChange}/>
					</div>

					<div className="form-group">
						<label htmlFor="changeItemTitle">Change Item Name:</label>
						<input type="text" className="form-control" id="changeItemTitle"
						       name="changeItemTitle"
						       value={this.state.changeItemTitle} onChange={this.handleInputChange}/>
					</div>

					<div className="form-group">
						<label htmlFor="changeItemStatus">Change Item Status:</label>
						<select className="form-control" id="changeItemStatus" name="changeItemStatus"
						        value={this.state.changeItemStatus} onChange={this.handleInputChange}>
							<option value="">Any</option>
							<option value="New">New</option>
							<option value="Impacting">Impacting</option>
							<option value="Impacted">Impacted</option>
							<option value="Returned">Returned</option>
							<option value="Approved">Approved</option>
							<option value="Closed">Closed</option>
							<option value="Withdrawn">Withdrawn</option>
							<option value="Rejected">Rejected</option>
							<option value="Provisional">Provisional</option>
							<option value="On-Hold">On-Hold</option>
							<option value="Archived">Archived</option>
						</select>
					</div>
					<a href={'/projectSearchResults?projectCode=' + this.state.projectCode
					+ '&projectTitle=' + this.state.projectTitle
					+ '&changeItemTitle=' + this.state.changeItemTitle
					+ '&changeItemStatus=' + this.state.changeItemStatus}
					   className="btn btn-success btn-lg btn-block" role="button">Search Projects</a>
				</div>
			</div>
		)
	}
}