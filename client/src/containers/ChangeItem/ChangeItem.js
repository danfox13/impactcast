/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';

import ChangeItemDetails from '../../components/ChangeItem/ChangeItemDetails';
import RequiredResources from '../../components/ChangeItem/RequiredResources';

export default class ChangeItem extends Component {
	render() {
		return (
			<div>
				<ChangeItemDetails/>
				<RequiredResources/>
			</div>
		)
	}
}