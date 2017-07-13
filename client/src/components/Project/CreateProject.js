import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup, InputGroup, Panel} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import {submitDocument, handleInputChange} from '../../api';

export default class CreateProject extends Component {
    constructor() {
        super();
        this.state = {
            projectCode: '',
            projectTitle: ''
        };

        this.handleInputChange = handleInputChange.bind(this);
        this.handleSubmit = event => {
            event.preventDefault();
            submitDocument('newProject', this.state, response => {
                if (response.result.projectCode) {
                    browserHistory.push('/project/' + response.result.projectCode);
                }
            })
        }
    }

    render() {
        return (
            <Panel header="Create a Project" bsStyle="primary">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="projectCode">
                        <ControlLabel>Project Code:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="projectCode" required
                                         value={this.state.projectCode} onChange={this.handleInputChange}/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>

                    <FormGroup controlId="projectTitle">
                        <ControlLabel>Name:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="projectTitle" required
                                         value={this.state.projectTitle} onChange={this.handleInputChange}/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>

                    <Button type="submit" bsStyle="success" bsSize="large" block>Create Project</Button>
                </form>

            </Panel>
        )
    }
}