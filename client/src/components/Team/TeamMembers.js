/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';

class DataRow extends Component {
	render() {
		return (
			<tr>
				<td><a href={'/resource/' + this.props.teamMember._id} className="btn btn-success"
				       role="button">View</a>
				</td>
				<td>{this.props.teamMember.resourceName}</td>
				<td>{this.props.teamMember.role}</td>
				<td>
					<a href={'/team/' + this.props.team.teamName + '/remove/' + this.props.teamMember._id}
					   className="btn btn-danger btn-block"
					   role="button">Remove</a>
				</td>
			</tr>
		)
	}
}

class TeamMembers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			team: {},
			teamMembers: []
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			team: nextProps.team,
			teamMembers: nextProps.team.teamMembers
		});
	}

	render() {
		let dataRows = this.state.teamMembers.map(function (teamMember) {
			return <DataRow key={teamMember._id} dataItem={teamMember}/>
		});

		return (
			<div className="row">
				<div className="col-sm-12">
					<div className="container">
						<div className="panel panel-default">
							<div className="panel-heading text-cente"><h3>Team Members</h3></div>
							<div className="panel-body">
								<div className="table-responsive">
									<table className="table table-striped table-hover">
										<thead>
										<tr>
											<th>View</th>
											<th>Name</th>
											<th>Role</th>
											<th>Remove</th>
										</tr>
										</thead>
										<tbody>
										<tr>
											{dataRows}
										</tr>
										<tr>
											<td></td>
											<td></td>
											<td></td>
											<td>
												<a href={'/team/' + this.state.team.teamName + '/addTeamMember'}
												   className="btn btn-success btn-block" role="button">Add</a>
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

module.exports = TeamMembers;