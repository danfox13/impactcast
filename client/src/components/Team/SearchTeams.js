import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup, Panel} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export default class SearchTeams extends Component {
    constructor() {
        super();
        this.state = {
            teamName: '',
            resourceName: ''
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
            <Panel header="Search Teams" bsStyle="primary">
                <form>
                    <FormGroup controlId="teamName">
                        <ControlLabel htmlFor="teamName">Team Name:</ControlLabel>
                        <FormControl name="teamName" value={this.state.teamName}
                                     onChange={this.handleInputChange}/>
                    </FormGroup>

                    <FormGroup controlId="resourceName">
                        <ControlLabel htmlFor="resourceName">Resource Name:</ControlLabel>
                        <FormControl name="resourceName" value={this.state.resourceName}
                                     onChange={this.handleInputChange}/>
                    </FormGroup>
                    <LinkContainer to={'/teamSearchResults?teamName=' + this.state.teamName
                                     + '&resourceName=' + this.state.resourceName}>
                        <Button bsStyle="success" bsSize="large" block>Search Teams</Button>
                    </LinkContainer>
                </form>
            </Panel>
        )
    }
}