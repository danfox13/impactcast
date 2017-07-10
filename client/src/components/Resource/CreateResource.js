import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup, InputGroup, Panel} from 'react-bootstrap';

export default class CreateResource extends Component {
    render() {
        return (
            <Panel header="Create a New Resource" bsStyle="primary">
                <form>
                    <FormGroup controlId="resourceName">
                        <ControlLabel htmlFor="resourceName">Name:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="resourceName" required/>
                        </InputGroup>
                        <FormControl.Feedback aria-hidden="true"/>
                    </FormGroup>

                    <FormGroup controlId="employeeId">
                        <ControlLabel htmlFor="employeeId">Employee ID:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>1</InputGroup.Addon>
                            <FormControl name="employeeId" pattern="^[0-9]*$" maxlength="6"/>
                        </InputGroup>
                        <FormControl.Feedback aria-hidden="true"/>
                    </FormGroup>

                    <FormGroup controlId="location">
                        <ControlLabel htmlFor="location">Location:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="location"/>
                        </InputGroup>
                        <FormControl.Feedback aria-hidden="true"/>
                    </FormGroup>

                    <FormGroup controlId="email">
                        <ControlLabel htmlFor="email">Email:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>@</InputGroup.Addon>
                            <FormControl name="email"
                                         pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
                                         required/>
                        </InputGroup>
                        <FormControl.Feedback aria-hidden="true"/>
                    </FormGroup>

                    <FormGroup controlId="role">
                        <ControlLabel htmlFor="role">Job Title:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="role" required/>
                        </InputGroup>
                        <FormControl.Feedback aria-hidden="true"/>
                    </FormGroup>

                    <Button type="submit" bsStyle="success" bsSize="large" block>Create Resource</Button>
                </form>
            </Panel>
        )
    }
}