/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';
import Heading from '../components/Home/Heading';
import StatusItems from '../components/Home/StatusItems';
import DataTable from '../components/Home/DataTable';

export default class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            totalNewItems: 0,
            totalReadyToImpact: 0,
            totalRejectedImpacts: 0,
            totalReadyToForecast: 0
        };
        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        let url = 'http://localhost:3001/homeData';
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                console.log("Results: " + data.results);
                this.setState({
                    totalNewItems: data.results[0],
                    totalReadyToImpact: data.results[1],
                    totalRejectedImpacts: data.results[2],
                    totalReadyToForecast: data.results[3]
                });
            })
            .catch(err => console.log(err));
    }
    
    render() {
        return (
            <div>
                <div>
                    <Heading />
                    <StatusItems
                        totalNewItems={this.state.totalNewItems}
                        totalReadyToImpact={this.state.totalReadyToImpact}
                        totalRejectedImpacts={this.state.totalRejectedImpacts}
                        totalReadyToForecast={this.state.totalReadyToForecast}
                    />
                    <div className="row">
                        <DataTable
                            tableHeader="New Items"
                            viewLink="#"
                            itemLink="#"
                            changeItem="Network Changes"
                            projectCode="BANK"
                            projectTitle="Banking System Upgrade"
                        />
                        <DataTable
                            tableHeader="Ready to Impact"
                            viewLink="#"
                            itemLink="#"
                            projectCode="BANK"
                            changeItem="Back End Changes"
                            projectTitle="Banking System Upgrade"
                        />
                    </div>
                    <div className="row">
                        <DataTable
                            tableHeader="Rejected Impacts"
                            viewLink="#"
                            itemLink="#"
                            projectCode=""
                            changeItem=""
                            projectTitle=""
                        />
                        <DataTable
                            tableHeader="Ready to Forecast"
                            viewLink="#"
                            itemLink="#"
                            projectCode="BANK"
                            changeItem="Banking System Upgrade"
                            projectTitle="UI Changes"
                        />
                    </div>
                </div>
            </div>
        )
    }
}

