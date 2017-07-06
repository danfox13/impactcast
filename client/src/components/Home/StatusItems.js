import React, {Component} from 'react';
import StatusItem from './StatusItem';

export default class StatusItems extends Component {
	render() {
		return (
			<div className="row">
				<StatusItem
					numberOfItems={this.props.totalNewItems}
					itemHeading="New Items"
				/>
				<StatusItem
					numberOfItems={this.props.totalReadyToImpact}
					itemHeading="Items Ready to Impact"
				/>
				<StatusItem
					numberOfItems={this.props.totalRejectedImpacts}
					itemHeading="Rejected Impacts"
				/>
				<StatusItem
					numberOfItems={this.props.totalReadyToForecast}
					itemHeading="Items Ready to Forecast"
				/>
			</div>
		)
	}
}