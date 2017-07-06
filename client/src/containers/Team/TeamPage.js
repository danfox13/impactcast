/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';
import Team from '../../components/Team/Team';
import TeamMembers from '../../components/Team/TeamMembers';
import TeamForecast from '../../components/Team/TeamForecast';

export default class TeamPage extends Component {
	constructor() {
		super();
		this.state = {
			team: {},
			teamForecast: []
		};

		this.loadData = this.loadData.bind(this);
	}

	componentWillMount() {
		let teamName = this.props.params.teamName;
		this.loadData(teamName);
	}

	loadData(teamName) {
		let url = 'http://localhost:3001/team/' + teamName;
		fetch(url)
			.then(response => response.json())
			.then((results) => {
				this.setState({
					team: results.result.team,
					teamForecast: results.result.teamForecast
				})
					.catch(err => console.log(err));
			});
	}

	render() {
		return (
			<div>
				<Team
					teamName={this.state.team.teamName}
				/>
				<TeamMembers
					team={this.state.team}
				/>
				<TeamForecast
					teamForecast={this.state.teamForecast}
				/>
			</div>
		)
	}
}