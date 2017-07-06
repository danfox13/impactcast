/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup, InputGroup, Panel} from 'react-bootstrap';

export default class UpdateProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectCode: this.props.projectCode,
            projectName: this.props.projectName
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
            <Panel>
                <h1 className="text-center">Update Project</h1>
                <form>
                    <FormGroup controlId="projectCode">
                        <ControlLabel>Project Code:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="projectCode" value={this.state.projectCode}
                                         onChange={this.handleInputChange} required/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="projectName">
                        <ControlLabel>Project Name:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="projectName" value={this.state.projectName}
                                         onChange={this.handleInputChange} required/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>

                    <Button type="submit" bsStyle="success" bsSize="large" block>Update Project</Button>
                </form>
            </Panel>
        )
    }
}