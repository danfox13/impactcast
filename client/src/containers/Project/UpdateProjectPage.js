/**
 * @author: Artur Komoter
 */

import React, { Component } from 'react';
import UpdateProject from '../../components/Project/UpdateProject';

export default class UpdateProjectPage extends Component
{
	render()
	{
		return (
			<UpdateProject projectCode={this.props.params.id}
			               projectName={this.props.projectName}/>
		)
	}
}