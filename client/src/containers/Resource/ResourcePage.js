/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';
import ResourceDetails from '../../components/Resource/ResourceDetails';
import ResourceForecast from '../../components/Resource/ResourceForecast';

export default class ResourcePage extends Component {
	render() {
		return (
			<div>
				<ResourceDetails />
				<ResourceForecast/>
			</div>
		)
	}
}