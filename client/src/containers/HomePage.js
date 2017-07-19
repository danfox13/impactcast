/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';
import {Row} from 'react-bootstrap';

import Heading from '../components/Home/Heading';
import StatusItems from '../components/Home/StatusItems';
import DataTable from '../components/Home/DataTable';

export default class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            newItems: [],
            readyToImpact: [],
            rejectedImpacts: [],
            readyToForecast: []
        };
        this.loadData = this.loadData.bind(this);
    }

    componentWillMount() {
        this.loadData()
    }

    loadData() {
        let url = 'http://localhost:3001/homeData';
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    newItems: data.results.newItems,
                    readyToImpact: data.results.readyToImpact,
                    rejectedImpacts: data.results.rejectedImpacts,
                    readyToForecast: data.results.readyToForecast
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <Heading/>
                <StatusItems
                    totalNewItems={this.state.newItems.length}
                    totalReadyToImpact={this.state.readyToImpact.length}
                    totalRejectedImpacts={this.state.rejectedImpacts.length}
                    totalReadyToForecast={this.state.readyToForecast.length}
                />
                <Row>
                    <DataTable
                        tableHeader="New Items"
                        dataItems={this.state.newItems}
                    />
                    <DataTable
                        tableHeader="Ready to Impact"
                        dataItems={this.state.readyToImpact}
                    />
                </Row>
                <Row>
                    <DataTable
                        tableHeader="Rejected Impacts"
                        dataItems={this.state.rejectedImpacts}
                    />
                    <DataTable
                        tableHeader="Ready to Forecast"
                        dataItems={this.state.readyToForecast}
                    />
                </Row>
            </div>
        )
    }
}