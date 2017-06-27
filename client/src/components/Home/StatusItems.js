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
                    numberOfItems="1"
                    itemHeading="Items Ready to Impact"
                />
                <StatusItem
                    numberOfItems="0"
                    itemHeading="Rejected Impacts"
                />
                <StatusItem
                    numberOfItems="1"
                    itemHeading="Items Ready to Forecast"
                />
            </div>
        )
    }
}