/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';
import {Alert, Panel, Table} from 'react-bootstrap';
import {Link} from 'react-router';

class Forecast extends Component {
    render() {
        return (
            <tr>
                <td>
                    <Link to={`/resource/${this.props.forecast.resourceId}`}>{this.props.forecast.name}</Link>
                </td>
                <td>

                </td>
            </tr>
        )
    }
}

export default class TeamForecast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            today: new Date(),
            teamName: props.teamName,
            teamForecast: props.teamForecast
        };

        this.getFormattedMonth = this.getFormattedMonth.bind(this);
        this.getMonthFromNow = this.getMonthFromNow.bind(this);
        this.getCurrentMonth = this.getCurrentMonth.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            teamName: nextProps.teamName,
            teamForecast: nextProps.teamForecast
        })
    }

    getCurrentMonth() {
        return this.getFormattedMonth(this.state.today.getMonth());
    }

    getMonthFromNow(monthFromNow) {
        return this.getFormattedMonth(this.state.today.getMonth() + monthFromNow);
    }

    getFormattedMonth(month) {
        const months = [
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
        ];
        return months[month % 12];
    }

    render() {
        let dataRows = this.state.teamForecast.map(forecast => {
            return <Forecast key={forecast.resourceId} forecast={forecast}/>
        });

        return (
            <Panel header="Six Month Forecast Delta">
                {this.state.teamForecast.length ?
                    <Table striped hover responsive>
                        <thead>
                        <tr>
                            <th className="col-md-1 text-center">Name</th>
                            <th className="col-md-1 text-center">{this.getCurrentMonth()}</th>
                            <th className="col-md-1 text-center">{this.getMonthFromNow(1)}</th>
                            <th className="col-md-1 text-center">{this.getMonthFromNow(2)}</th>
                            <th className="col-md-1 text-center">{this.getMonthFromNow(3)}</th>
                            <th className="col-md-1 text-center">{this.getMonthFromNow(4)}</th>
                            <th className="col-md-1 text-center">{this.getMonthFromNow(5)}</th>
                            <th className="col-md-1 text-center">{this.getMonthFromNow(6)}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dataRows}
                        </tbody>
                    </Table>
                    : <Alert bsStyle="danger" className="text-center">No forecast available</Alert>
                }
            </Panel>
        )
    }
}