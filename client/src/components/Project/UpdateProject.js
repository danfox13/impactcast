/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup, InputGroup, Panel} from 'react-bootstrap';
import {browserHistory} from 'react-router';

export default class UpdateProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectCode: this.props.projectCode,
            projectTitle: this.props.projectTitle
        };

        this.updateProject = this.updateProject.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            projectTitle: nextProps.projectTitle
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.updateProject();
    }

    updateProject() {
        let url = 'http://localhost:3001/project/' + this.props.projectCode + '/update';
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
            <Panel>
                <h1 className="text-center">Update Project</h1>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="projectCode">
                        <ControlLabel>Project Code:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="projectCode" value={this.state.projectCode}
                                         onChange={this.handleInputChange} required/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="projectTitle">
                        <ControlLabel>Project Title:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="projectTitle" value={this.state.projectTitle}
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