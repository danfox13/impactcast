/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup, Panel} from 'react-bootstrap';

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
            <Panel header={<div className="text-center">Add a Team Member</div>}>
                <FormGroup controlId="resourceName">
                    <ControlLabel>Name:</ControlLabel>
                    <FormControl name="resourceName" value={this.state.resourceName}
                                 onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup controlId="employeeId">
                    <ControlLabel>Employee ID:</ControlLabel>
                    <FormControl name="employeeId" value={this.state.employeeId}
                                 onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup controlId="location">
                    <ControlLabel>Location:</ControlLabel>
                    <FormControl name="location" value={this.state.location}
                                 onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup controlId="email">
                    <ControlLabel>Email:</ControlLabel>
                    <FormControl name="email" value={this.state.email}
                                 onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup controlId="role">
                    <ControlLabel>Job Title:</ControlLabel>
                    <FormControl name="role" value={this.state.role}
                                 onChange={this.handleInputChange}/>
                </FormGroup>

                <Button bsStyle="success" bsSize="large" block
                        href={'addTeamResourceSearchResults?resourceName=' + this.state.resourceName
                            + '&employeeId=' + this.state.employeeId
                            + '&location=' + this.state.location
                            + '&email=' + this.state.email
                            + '&role=' + this.state.role}>
                    Search Resources
                </Button>
            </Panel>
        )
    }
}