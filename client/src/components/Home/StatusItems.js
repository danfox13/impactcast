import React, {Component} from 'react';
import {Row} from 'react-bootstrap';

import StatusItem from './StatusItem';

export default class StatusItems extends Component {
    render() {
        return (
            <Row>
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
            </Row>
        )
    }
}