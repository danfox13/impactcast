/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';

class Forecast extends Component {
    render() {
        return (
            <p className="bg-danger text-center">
                {this.props.forecastValue}
            </p>
        )
    }
}

class DataRow extends Component {
    constructor() {
        super();

        this.displayMonthForecast = this.displayMonthForecast.bind(this);
    }

    displayMonthForecast(month) {
        if (month === 0) {
            return <Forecast
                className='bg-success text-center'
                forecastValue={month}/>
        } else if (month < 0) {
            return <Forecast
                className='bg-danger text-center'
                forecastValue={'-' + month}/>
        } else {
            return <Forecast
                className='bg-danger text-center'
                forecastValue={'+' + month}/>
        }
    }

    render() {
        return (
            <tr>
                <td><a href={'/resource/' + this.props.forecast.teamMember.resourceId}>Test Member</a></td>
                <td>
                    { this.displayMonthForecast(this.props.forecast.teamMember.currentMonth) }
                </td>
                <td>
                    { this.displayMonthForecast(this.props.forecast.teamMember.monthPlusOne) }
                </td>
                <td>
                    { this.displayMonthForecast(this.props.forecast.teamMember.monthPlusTwo) }
                </td>
                <td>
                    { this.displayMonthForecast(this.props.forecast.teamMember.monthPlusThree) }
                </td>
                <td>
                    { this.displayMonthForecast(this.props.forecast.teamMember.monthPlusFour) }
                </td>
                <td>
                    { this.displayMonthForecast(this.props.forecast.teamMember.monthPlusFive) }
                </td>
                <td>
                    { this.displayMonthForecast(this.props.forecast.teamMember.monthPlusSix) }
                </td>
            </tr>
        )
    }
}

class TeamForecast extends Component {
    constructor() {
        super();
        this.state = {
            teamForecast: [],
            today: new Date(),
            month: [
                " January",
                " February",
                " March",
                " April",
                " May",
                " June",
                " July",
                " August",
                " September",
                " October",
                " November",
                " December"
            ]
        };

        this.getFormattedMonth = this.getFormattedMonth.bind(this);
        this.getMonthFromNow = this.getMonthFromNow.bind(this);
        this.getCurrentMonth = this.getCurrentMonth.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            teamForecast: nextProps.teamForecast
        });
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

        let dataRows = this.state.teamForecast.map(function (forecast) {
            return <DataRow key={forecast.resourceId} forecast={forecast}/>
        });

        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading text-cente"><h3>Six Month Forecast Delta</h3></div>
                            <div className="panel-body">
                                <div className=" table-responsive ">
                                    <br/>
                                    <table className=" table table-striped table-hover table-bordered">
                                        <thead>
                                        <tr>
                                            <th colSpan="1" className="text-center col-md-1">Name</th>
                                            <th colSpan="1"
                                                className="text-center col-md-1"> { this.getCurrentMonth() } </th>
                                            <th colSpan="1"
                                                className="text-center col-md-1"> { this.getMonthFromNow(1) } </th>
                                            <th colSpan="1"
                                                className="text-center col-md-1"> { this.getMonthFromNow(2) } </th>
                                            <th colSpan="1"
                                                className="text-center col-md-1"> { this.getMonthFromNow(3) } </th>
                                            <th colSpan="1"
                                                className="text-center col-md-1"> { this.getMonthFromNow(4) } </th>
                                            <th colSpan="1"
                                                className="text-center col-md-1"> { this.getMonthFromNow(5) } </th>
                                            <th colSpan="1"
                                                className="text-center col-md-1"> { this.getMonthFromNow(6) } </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {dataRows}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = TeamForecast;