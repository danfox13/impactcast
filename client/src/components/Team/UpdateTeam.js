/**
 * @author: Artur Komoter
 */
import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {Button, ControlLabel, FormControl, FormGroup, InputGroup, Panel} from 'react-bootstrap';
import {handleInputChange, submitDocument} from '../../api';

export default class UpdateTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamName: props.teamName
        };

        this.handleInputChange = handleInputChange.bind(this);
        this.handleSubmit = event => {
            event.preventDefault();
            submitDocument(`/team/${props.teamName}/update`, this.state, response => {
                if (response.result.route) {
                    browserHistory.push(response.result.route);
                }
            })
        }
    }

    render() {
        return (
            <Panel header={`Update ${this.props.teamName}`} bsStyle="primary">
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

                    <Button type="submit" bsStyle="success" bsSize="large" block>Update Team</Button>
                </form>
            </Panel>
        )
    }
}