import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup, InputGroup, Panel} from 'react-bootstrap';
import {browserHistory} from 'react-router';

export default class CreateProject extends Component {
    constructor() {
        super();
        this.state = {
            projectCode: '',
            projectTitle: ''
        };

        this.createProject = this.createProject.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.createProject();
    }

    createProject() {
        let url = 'http://localhost:3001/newProject';
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                projectCode: this.state.projectCode,
                projectTitle: this.state.projectTitle
            })
        }).then(response => response.json())
            .then(this.handleRedirect)
            .catch(err => console.log(err));
    }

    handleRedirect(response) {
        if (response.result.projectCode) {
            browserHistory.push('/project/' + response.result.projectCode);
        }
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