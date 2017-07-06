/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import UpdateResource from '../../components/Resource/UpdateResource';

export default class UpdateResourcePage extends Component {
	render() {
		return (
			<UpdateResource resourceName={this.props.params.resourceName}/>
		)
	}
}