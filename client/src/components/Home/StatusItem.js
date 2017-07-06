import React, {Component} from 'react';

export default class StatusItem extends Component {
	render() {
		return (
			<div className="col-sm-3">
				<div className="panel panel-default">
					<div className="panel-body">
						<center>
							<h1>{this.props.numberOfItems}</h1>
							<h5>{this.props.itemHeading}</h5>
						</center>
					</div>
				</div>
			</div>
		)
	}
}