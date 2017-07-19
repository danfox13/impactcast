/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup, InputGroup, Panel} from 'react-bootstrap';

export default class UpdateResource extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resourceName: this.props.resourceName,
            employeeId: this.props.employeeId,
            location: this.props.location,
            email: this.props.email,
            role: this.props.role
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
            <Panel header={<div className="text-center">Update Resource</div>}>
                <form>
                    <FormGroup controlId="resourceName">
                        <ControlLabel htmlFor="resourceName">Name:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="resourceName" value={this.state.resourceName}
                                         onChange={this.handleInputChange} required/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="employeeId">
                        <ControlLabel>Employee ID:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>1</InputGroup.Addon>
                            <FormControl name="employeeId" value={this.state.employeeId}
                                         onChange={this.handleInputChange} required/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="location">
                        <ControlLabel>Location:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="location" value={this.state.location}
                                         onChange={this.handleInputChange} required/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="email">
                        <ControlLabel>E-mail:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>@</InputGroup.Addon>
                            <FormControl name="email" value={this.state.email}
                                         pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
                                         onChange={this.handleInputChange} required/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="role">
                        <ControlLabel>Job Role:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="role" value={this.state.role}
                                         onChange={this.handleInputChange} required/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>

                    <Button type="submit" bsStyle="success" bsSize="large" block>Update Resource</Button>
                </form>
            </Panel>
        )
    }
}