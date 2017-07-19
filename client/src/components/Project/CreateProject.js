import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup, InputGroup, Panel} from 'react-bootstrap';

export default class CreateProject extends Component {
    render() {
        return (
            <Panel header={<div className="text-center">Create a Project</div>}>
                <form>
                    <FormGroup controlId="projectCode">
                        <ControlLabel>Project Code:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="projectCode" required/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>

                    <FormGroup controlId="projectName">
                        <ControlLabel>Name:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="projectName" required/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>

                    <Button type="submit" bsStyle="success" bsSize="large" block>Create Project</Button>
                </form>
            </Panel>
        )
    }
}