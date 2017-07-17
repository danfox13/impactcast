import React, {Component} from 'react';
import {Alert, Panel, Tab, Table, Tabs} from 'react-bootstrap';
import {Link} from 'react-router';

class Forecast extends Component {
    render() {
        let totalDays = 0;

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
                    {this.props.projects.forEach(project => {
                        project.changeItems.forEach(changeItem => {
                            totalDays += changeItem.resourcesRequired.impact.days;
                            return (
                                <tr key={changeItem._id}>
                                    <td><Link to={'/project/' + project.projectCode}>{project.projectTitle}</Link></td>
                                    <td>
                                        <Link to={'/project/' + project.projectCode + '/' + changeItem.changeTitle}>
                                            {changeItem.changeTitle}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={'/project/' + project.projectCode
                                        + '/' + changeItem.changeTitle
                                        + '/' + changeItem.resourcesRequired._id}>
                                            {changeItem.resourcesRequired.roleName}
                                        </Link>
                                    </td>
                                    <td>{changeItem.resourcesRequired.impact.days}</td>
                                </tr>
                            )
                        })
                    })}
                    </tbody>
                </Table>
                { totalDays < this.props.workingDays &&
                <Alert bsStyle="danger">
                    <strong>Under-forecasted by {this.props.workingDays - totalDays} days!</strong>
                </Alert>
                }
                { totalDays > this.props.workingDays &&
                <Alert bsStyle="danger">
                    <strong>Over-forecasted by {this.props.workingDays - totalDays} days!</strong>
                </Alert>
                }
                { totalDays === this.props.workingDays &&
                <Alert bsStyle="success">
                    <strong>Fully forecasted</strong>
                </Alert>
                }
            </div>
        )
    }
}

export default class ResourceForecast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            today: new Date()
        };

        this.getMonthFromNow = this.getMonthFromNow.bind(this);
        this.getCurrentMonth = this.getCurrentMonth.bind(this);
    }

    getCurrentMonth() {
        return ResourceForecast.getFormattedMonth(this.state.today.getMonth());
    }

    getMonthFromNow(monthFromNow) {
        return ResourceForecast.getFormattedMonth(this.state.today.getMonth() + monthFromNow);
    }

    static getFormattedMonth(month) {
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
        return (
            <Panel header="Six Month Forecast">
                { this.props.projects &&
                <Tabs id="forecast" defaultActiveKey={1}>
                    <Tab eventKey={1} title={this.getCurrentMonth()}>
                        <Forecast projects={this.props.projects[0]} workingDays={this.props.workingDays[0]}/>
                    </Tab>
                    <Tab eventKey={2} title={this.getMonthFromNow(1)}>
                        <Forecast projects={this.props.projects[1]} workingDays={this.props.workingDays[1]}/>
                    </Tab>
                    <Tab eventKey={3} title={this.getMonthFromNow(2)}>
                        <Forecast projects={this.props.projects[2]} workingDays={this.props.workingDays[2]}/>
                    </Tab>
                    <Tab eventKey={4} title={this.getMonthFromNow(3)}>
                        <Forecast projects={this.props.projects[3]} workingDays={this.props.workingDays[3]}/>
                    </Tab>
                    <Tab eventKey={5} title={this.getMonthFromNow(4)}>
                        <Forecast projects={this.props.projects[4]} workingDays={this.props.workingDays[4]}/>
                    </Tab>
                    <Tab eventKey={6} title={this.getMonthFromNow(5)}>
                        <Forecast projects={this.props.projects[5]} workingDays={this.props.workingDays[5]}/>
                    </Tab>
                    <Tab eventKey={7} title={this.getMonthFromNow(6)}>
                        <Forecast projects={this.props.projects[6]} workingDays={this.props.workingDays[6]}/>
                    </Tab>
                </Tabs>
                }
            </Panel>
        )
    }
}