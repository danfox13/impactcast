import React, {Component} from 'react';
import SearchTeams from 'SearchTeams';
import TeamSearchResults from 'TeamSearchResults';

export default class TeamSearch extends Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<div>
				<SearchTeams />
				<TeamSearchResults />
			</div>
		)
	}
}