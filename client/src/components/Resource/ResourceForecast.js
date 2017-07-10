import React, {Component} from 'react';
import {Alert, Panel, Tab, Table, Tabs} from 'react-bootstrap';

class Forecast extends Component {
    render() {
        return (
            <div>
                <Table striped hover responsive>
                    <thead>
                    <tr>
                        <th>Project</th>
                        <th>Change Item</th>
                        <th>Role</th>
                        <th>Days</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <a href="/project/:projectCode">Placeholder</a>
                        </td>
                        <td>
                            <a href="/project/:projectCode/:changeItem">
                                Placeholder
                            </a>
                        </td>
                        <td>
                            <a href="/project/:projectCode/:changeItem/:requiredResource">
                                Placeholder
                            </a>
                        </td>
                        <td>Placeholder</td>
                    </tr>
                    </tbody>
                </Table>
                <Alert bsStyle="danger">
                    <strong>Under-forecasted by 10 days!</strong>
                </Alert>
            </div>
        )
    }
}

export default class ResourceDetails extends Component {
    constructor() {
        super();
        this.state = {
            today: new Date(),
            month: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ]
        };

        this.getFormattedMonth = this.getFormattedMonth.bind(this);
        this.getMonthFromNow = this.getMonthFromNow.bind(this);
        this.getCurrentMonth = this.getCurrentMonth.bind(this);
    }

    getCurrentMonth() {
        return this.getFormattedMonth(this.state.today.getMonth());
    }

    getMonthFromNow(monthFromNow) {
        return this.getFormattedMonth(this.state.today.getMonth() + monthFromNow);
    }

    getFormattedMonth(month) {
        return this.state.month[month % 12];
    }

    render() {
        return (
            <Panel header="Six Month Forecast">
                <Tabs defaultActiveKey={1}>
                    <Tab eventKey={1} title={this.getCurrentMonth()}>
                        <Forecast/>
                    </Tab>
                    <Tab eventKey={2} title={this.getMonthFromNow(1)}>
                        <Forecast/>
                    </Tab>
                    <Tab eventKey={3} title={this.getMonthFromNow(2)}>
                        <Forecast/>
                    </Tab>
                    <Tab eventKey={4} title={this.getMonthFromNow(3)}>
                        <Forecast/>
                    </Tab>
                    <Tab eventKey={5} title={this.getMonthFromNow(4)}>
                        <Forecast/>
                    </Tab>
                    <Tab eventKey={6} title={this.getMonthFromNow(5)}>
                        <Forecast/>
                    </Tab>
                    <Tab eventKey={7} title={this.getMonthFromNow(6)}>
                        <Forecast/>
                    </Tab>
                </Tabs>
            </Panel>
        )
    }
}