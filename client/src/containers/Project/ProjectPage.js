/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import ProjectDetails from '../../components/Project/ProjectDetails';
import ChangeItems from "../../components/Project/ChangeItems";

export default class Project extends Component
{
	render()
	{
		return (
			<div>
				<ProjectDetails
					projectTitle="Banking System Upgrade"
					projectCode={this.props.params.id}
				/>
				<ChangeItems
					projectCode={this.props.params.id}
					changeItems={[
						{
							title: "Network",
							status: "lol",
							lid: new Date("July 4, 2017 12:00:00")
						},
						{
							title: "UI",
							status: "asasa",
							lid: new Date("July 4, 2017 12:10:00")
						}
					]}
				/>
			</div>
		)
	}
}