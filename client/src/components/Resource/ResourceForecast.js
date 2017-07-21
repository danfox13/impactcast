import React, {Component} from 'react';
import {Alert, Panel, Tab, Table, Tabs} from 'react-bootstrap';
import {Link} from 'react-router';

class ChangeItemRow extends Component {
    render() {
        return (
            <tr>
                <td><Link to={'/project/' + this.props.project.projectCode}>{this.props.project.projectTitle}</Link>
                </td>
                <td>
                    <Link to={'/project/' + this.props.project.projectCode + '/' + this.props.changeItem.changeTitle}>
                        {this.props.changeItem.changeTitle}
                    </Link>
                </td>
                <td>
                    <Link to={'/project/' + this.props.project.projectCode
                    + '/' + this.props.changeItem.changeTitle
                    + '/' + this.props.changeItem.resourcesRequired._id}
                    >
                        {this.props.changeItem.resourcesRequired.roleName}
                    </Link>
                </td>
                <td>{this.props.changeItem.resourcesRequired.impact.days}</td>
            </tr>
        )
    }
}

class Forecast extends Component {
    render() {
        let totalDays = 0,
            dataRows = this.props.month.map(project =>
                project.changeItems.map(changeItem => {
                    totalDays += changeItem.resourcesRequired.impact.days;
                    return <ChangeItemRow key={changeItem._id} project={project} changeItem={changeItem}/>
                })
            );

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
                    {dataRows}
                    </tbody>
                </Table>
                <br/>
                {totalDays < this.props.workingDays &&
                <Alert bsStyle="danger">Under-forecasted by {this.props.workingDays - totalDays} days!</Alert>
                }
                {totalDays > this.props.workingDays &&
                <Alert bsStyle="danger">Over-forecasted by {this.props.workingDays - totalDays} days!</Alert>
                }
                {totalDays === this.props.workingDays &&
                <Alert bsStyle="success">Fully forecasted</Alert>
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
        let tabs = this.props.months.map((month, index) => {
            return (
                <Tab key={index} eventKey={index + 1} title={this.getMonthFromNow(index)}>
                    { month.length ?
                        <Forecast month={month} workingDays={this.props.workingDays[index]}/>
                        : <Alert bsStyle="danger">No forecast available</Alert>
                    }
                </Tab>
            )
        });

        return (
            <Panel header="Six Month Forecast">
                {this.props.months &&
                <Tabs id="forecast" defaultActiveKey={1}>
                    {tabs}
                </Tabs>
                }
            </Panel>
        )
    }
}