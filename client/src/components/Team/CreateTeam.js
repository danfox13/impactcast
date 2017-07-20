import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Button, ControlLabel, FormControl, FormGroup, InputGroup, Panel} from 'react-bootstrap';
import {handleInputChange, submitDocument} from '../../api';

export default class CreateTeam extends Component {
    constructor() {
        super();
        this.state = {
            teamName: ''
        };

        this.handleInputChange = handleInputChange.bind(this);
        this.handleSubmit = event => {
            event.preventDefault();
            submitDocument('/newTeam', this.state, response => {
                if (response.result.teamName) {
                    browserHistory.push(`/team/${response.result.teamName}`);
                }
            })
        }
    }

    render() {
        return (
            <Panel header="Create a Team" bsStyle="primary">
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