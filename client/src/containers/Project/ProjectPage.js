/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import ProjectDetails from '../../components/Project/ProjectDetails';
import ChangeItems from '../../components/Project/ChangeItems';

export default class Project extends Component {
	constructor() {
		super();
		this.state = {
			projectTitle: '',
			changeItems: []
		};

		this.loadData = this.loadData.bind(this);
	}

	componentWillMount() {
		this.loadData()
	}

	loadData() {
		let url = 'http://localhost:3001/project/' + this.props.params.projectCode;
		fetch(url)
			.then(response => response.json())
			.then((data) => {
				this.setState({
					projectTitle: data.results.projectTitle,
					changeItems: data.results.changeItems
				});
			})
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div>
				<ProjectDetails
					projectTitle={this.state.projectTitle}
					projectCode={this.props.params.projectCode}
				/>
				<ChangeItems
					projectCode={this.props.params.projectCode}
					changeItems={this.state.changeItems}
				/>
			</div>
		)
	}
}