import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Button, ControlLabel, FormControl, FormGroup, InputGroup, Panel} from 'react-bootstrap';

export default class CreateTeam extends Component {
    constructor() {
        super();
        this.state = {
            teamName: ''
        };

        this.createTeam = this.createTeam.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.createTeam();
    }

    createTeam() {
        let url = 'http://localhost:3001/newTeam';
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                teamName: this.state.teamName,
            })
        }).then(response => response.json())
            .then(this.handleRedirect)
            .catch(err => console.log(err));
    }

    handleRedirect(response) {
        if (response.result.teamName) {
            browserHistory.push('team/' + response.result.teamName);
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
            <Panel header="Create a Team" b>
                <form onSubmit={this.handleSubmit} data-toggle="validator" role="form">

                    <FormGroup>
                        <ControlLabel htmlFor="teamName">Team Name:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="teamName" required
                                         value={this.state.teamName} onChange={this.handleInputChange}/>
                        </InputGroup>
                        <FormControl.Feedback aria-hidden="true"/>
                    </FormGroup>

                    <Button type="submit" bsStyle="success" bsSize="large" block>Create Team</Button>
                </form>
            </Panel>
        )
    }
}