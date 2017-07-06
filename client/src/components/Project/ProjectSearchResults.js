import React, {Component} from 'react';

class ResultRow extends Component {
	render() {
		return (
			<tr>
				<td>
					<a href={'/project/' + this.props.project.projectCode}
					   className="btn btn-success" role="button">View
					</a>
				</td>
				<td>{this.props.project.projectCode}</td>
				<td>{this.props.project.projectTitle}</td>
				{this.props.project.changeItems.map(changeItem =>
					<td key={changeItem._id}>
						<a href={'/changeItem/' + changeItem._id}>{changeItem.changeItemTitle}</a>
						<br/>
					</td>
				)}
			</tr>
		)
	}
}

export default class ProjectSearchResults extends Component {
	constructor(props) {
		super(props);
		this.state = {
			results: this.props.searchResults
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			results: nextProps.searchResults
		});
	}

	render() {
		let resultRows = this.state.results.map(function (project) {
			return <ResultRow key={project._id} project={project}/>
		});

		return (
			<div className="panel panel-default">
				<div className="panel-heading text-cente"><h1>Search Results</h1></div>
				<div className="panel-body">
					<div className="table-responsive">
						<table className="table table-striped table-hover">
							<thead>
							<tr>
								<th>View Project</th>
								<th>Project Code</th>
								<th>Project Title</th>
								<th>Change Items</th>
							</tr>
							</thead>
							<tbody>{resultRows}</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	}
}