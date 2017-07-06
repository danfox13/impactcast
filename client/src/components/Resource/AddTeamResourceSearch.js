/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';

export default class AddTeamResourceSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resourceName: '',
            employeeId: '',
            location: '',
            email: '',
            role: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading text-center"><h1>Add a Team Member</h1></div>
                <div className="panel-body">
                    <div className="form-group">
                        <label htmlFor="resourceName">Name:</label>
                        <input type="text" className="form-control" id="resourceName" name="resourceName"
                               value={this.state.resourceName} onChange={this.handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="employeeId">Employee ID:</label>
                        <input type="text" className="form-control" id="employeeId" name="employeeId"
                               value={this.state.employeeId} onChange={this.handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location:</label>
                        <input type="text" className="form-control" id="location" name="location"
                               value={this.state.location} onChange={this.handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="text" className="form-control" id="email" name="email"
                               value={this.state.email} onChange={this.handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Job Title:</label>
                        <input type="text" className="form-control" id="role" name="role"
                               value={this.state.role} onChange={this.handleInputChange}/>
                    </div>

                    <a href={'addTeamResourceSearchResults?resourceName=' + this.state.resourceName
                    + '&employeeId=' + this.state.employeeId
                    + '&location=' + this.state.location
                    + '&email=' + this.state.email
                    + '&role=' + this.state.role}
                       className="btn btn-success btn-lg btn-block" role="button">Search Resources</a>
                </div>
            </div>
        )
    }
}