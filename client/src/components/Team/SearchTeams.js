import React, {Component} from 'react';

export default class SearchTeams extends Component {
	constructor() {
		super();
		this.state = {
			teamName: '',
			resourceName: ''
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
				<div className="panel-heading text-cente"><h1>Search Teams</h1></div>
				<div className="panel-body">
					<div className="form-group">
						<label htmlFor="teamName">Team Name:</label>
						<input type="text" className="form-control" id="teamName" name="teamName"
						       value={this.state.teamName} onChange={this.handleInputChange}/>
					</div>

					<div className="form-group">
						<label htmlFor="resourceName">Resource Name:</label>
						<input type="text" className="form-control" id="resourceName" name="resourceName"
						       value={this.state.resourceName} onChange={this.handleInputChange}/>
					</div>
					<a href={'/teamSearchResults?teamName=' + this.state.teamName + '&resourceName=' + this.state.resourceName}
					   className="btn btn-success btn-lg btn-block" role="button">Search Teams</a>
				</div>
			</div>
		)
	}
}