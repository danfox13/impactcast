/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';
import TeamSearchResults from '../../components/Team/TeamSearchResults';

export default class TeamSearchResultsPage extends Component {
	constructor() {
		super();
		this.state = {
			results: []
		};

		this.performSearch = this.performSearch.bind(this);
	}

	componentWillMount() {
		this.performSearch();
	}

	performSearch() {
		let url = `http://localhost:3001/searchTeams?teamName=${this.props.location.query.teamName}&resourceName=${this.props.location.query.resourceName}`;
		fetch(url)
			.then(response => response.json())
			.then((result) => {
				this.setState({
					results: result.results.results
				});
			})
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div>
				<TeamSearchResults
					searchResults={this.state.results}
				/>
			</div>
		)
	}
}