import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup, InputGroup, Panel} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import {handleInputChange, submitDocument} from '../../api';

export default class CreateResource extends Component {
    constructor() {
        super();
        this.state = {
            resourceName: '',
            employeeId: '',
            location: '',
            email: '',
            role: ''
        };

        this.handleInputChange = handleInputChange.bind(this);
        this.handleSubmit = event => {
            event.preventDefault();
            submitDocument('/newResource', this.state, response => {
                if (response.result.resourceId) {
                    browserHistory.push('/resource/' + response.result.resourceId);
                }
            })
        }
    }

    render() {
        return (
            <Panel header="Create a New Resource" bsStyle="primary">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="resourceName">
                        <ControlLabel htmlFor="resourceName">Name:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="resourceName" required value={this.state.resourceName}
                                         onChange={this.handleInputChange}/>
                        </InputGroup>
                        <FormControl.Feedback aria-hidden="true"/>
                    </FormGroup>

                    <FormGroup controlId="employeeId">
                        <ControlLabel htmlFor="employeeId">Employee ID:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>1</InputGroup.Addon>
                            <FormControl name="employeeId" pattern="^[0-9]*$" maxLength="6"
                                         value={this.state.employeeId} onChange={this.handleInputChange}/>
                        </InputGroup>
                        <FormControl.Feedback aria-hidden="true"/>
                    </FormGroup>

                    <FormGroup controlId="location">
                        <ControlLabel htmlFor="location">Location:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="location" value={this.state.location}
                                         onChange={this.handleInputChange}/>
                        </InputGroup>
                        <FormControl.Feedback aria-hidden="true"/>
                    </FormGroup>

                    <FormGroup controlId="email">
                        <ControlLabel htmlFor="email">Email:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>@</InputGroup.Addon>
                            <FormControl name="email"
                                         pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
                                         required value={this.state.email}
                                         onChange={this.handleInputChange}/>
                        </InputGroup>
                        <FormControl.Feedback aria-hidden="true"/>
                    </FormGroup>

                    <FormGroup controlId="role">
                        <ControlLabel htmlFor="role">Job Title:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="role" required value={this.state.role}
                                         onChange={this.handleInputChange}/>
                        </InputGroup>
                        <FormControl.Feedback aria-hidden="true"/>
                    </FormGroup>

                    <Button type="submit" bsStyle="success" bsSize="large" block>Create Resource</Button>
                </form>
            </Panel>
        )
    }
}