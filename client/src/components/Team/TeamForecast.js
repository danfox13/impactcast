/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';
import {Panel, Table} from 'react-bootstrap';

export default class TeamForecast extends Component {
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
            <Panel header={<div className="text-center">Six Month Forecast Delta</div>}>
                <Table striped hover bordered responsive>
                    <thead>
                    <tr>
                        <th className="col-md-1">Name</th>
                        <th className="col-md-1">{this.getCurrentMonth()}</th>
                        <th className="col-md-1">{this.getMonthFromNow(1)}</th>
                        <th className="col-md-1">{this.getMonthFromNow(2)}</th>
                        <th className="col-md-1">{this.getMonthFromNow(3)}</th>
                        <th className="col-md-1">{this.getMonthFromNow(4)}</th>
                        <th className="col-md-1">{this.getMonthFromNow(5)}</th>
                        <th className="col-md-1">{this.getMonthFromNow(6)}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Placeholder</td>
                        <td>
                            <p className="bg-danger text-center">-22</p>
                        </td>
                        <td>
                            <p className="bg-success text-center">21</p>
                        </td>
                        <td>
                            <p className="bg-danger text-center">-23</p>
                        </td>
                        <td>
                            <p className="text-center">0</p>
                        </td>
                        <td>
                            <p className="bg-danger text-center">-22</p>
                        </td>
                        <td>
                            <p className="bg-danger text-center">-22</p>
                        </td>
                        <td>
                            <p className="bg-danger text-center">-21</p>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </Panel>
        )
    }
}