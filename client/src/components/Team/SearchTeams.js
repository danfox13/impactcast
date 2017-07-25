import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup, Panel} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {handleInputChange} from '../../api';

export default class SearchTeams extends Component {
    constructor() {
        super();
        this.state = {
            teamName: '',
            resourceName: ''
        };

        this.handleInputChange = handleInputChange.bind(this);
    }

    render() {
        return (
            <Panel header="Search Teams" bsStyle="primary">
                <form>
                    <FormGroup controlId="teamName">
                        <ControlLabel htmlFor="teamName">Team Name:</ControlLabel>
                        <FormControl name="teamName" value={this.state.teamName}
                                     onChange={this.handleInputChange}/>
                    </FormGroup>

                    <FormGroup controlId="resourceName">
                        <ControlLabel htmlFor="resourceName">Resource Name:</ControlLabel>
                        <FormControl name="resourceName" value={this.state.resourceName} required
                                     onChange={this.handleInputChange}/>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <LinkContainer to={'/teamSearchResults?teamName=' + this.state.teamName
                                     + '&resourceName=' + this.state.resourceName}>
                        <Button bsStyle="success" bsSize="large" block>
                            Search Teams
                        </Button>
                    </LinkContainer>
                </form>
            </Panel>
        )
    }
}