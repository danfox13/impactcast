/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup, Panel} from 'react-bootstrap';
import {handleInputChange} from '../../api';

export default class ForecastResourceSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resourceName: '',
            employeeId: '',
            location: '',
            email: '',
            role: ''
        };

        this.handleInputChange = handleInputChange.bind(this);
    }

    render() {
        return (
            <Panel header={`Find a Resource for ${this.props.changeItem}`} bsStyle="primary">
                <FormGroup controlId="resourceName">
                    <ControlLabel htmlFor="resourceName">Name:</ControlLabel>
                    <FormControl name="resourceName" value={this.state.resourceName}
                                 onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup controlId="employeeId">
                    <ControlLabel htmlFor="employeeId">Employee ID:</ControlLabel>
                    <FormControl name="employeeId" value={this.state.employeeId}
                                 onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup controlId="location">
                    <ControlLabel htmlFor="location">Location:</ControlLabel>
                    <FormControl name="location" value={this.state.location}
                                 onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup controlId="email">
                    <ControlLabel htmlFor="email">Email:</ControlLabel>
                    <FormControl name="email" value={this.state.email}
                                 onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup controlId="role">
                    <ControlLabel htmlFor="role">Job Title:</ControlLabel>
                    <FormControl name="role" value={this.state.role}
                                 onChange={this.handleInputChange}/>
                </FormGroup>

                {/*using href until it's known why routing is not being resolved with LinkContainer*/}
                <Button bsStyle="success" bsSize="large" block
                        href={'forecastResourceSearchResults?resourceName=' + this.state.resourceName
                            + '&employeeId=' + this.state.employeeId
                            + '&location=' + this.state.location
                            + '&email=' + this.state.email
                            + '&role=' + this.state.role}
                >
                    Search Resources
                </Button>
            </Panel>
        )
    }
}