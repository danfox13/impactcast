/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import ForecastResourceSearchResults from '../../components/Resource/ForecastResourceSearchResults';

export default class ForecastResourceSearchResultsPage extends Component {

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
		let url = 'http://localhost:3001/searchResources?resourceName=' + this.props.location.query.resourceName
			+ '&employeeId=' + this.props.location.query.employeeId
			+ '&location=' + this.props.location.query.location
			+ '&email=' + this.props.location.query.email
			+ '&role=' + this.props.location.query.role;
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
				<ForecastResourceSearchResults searchResults={this.state.results}/>
			</div>
		)
	}
}