import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup, Panel} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {handleInputChange} from '../../api';

export default class SearchProjectAndChangeItems extends Component {
    constructor() {
        super();
        this.state = {
            projectCode: '',
            projectTitle: '',
            changeItemTitle: '',
            changeItemStatus: '',
        };

        this.handleInputChange = handleInputChange.bind(this);
    }

    render() {
        return (
            <Panel header="Search Projects" bsStyle="primary">
                <FormGroup controlId="projectCode">
                    <ControlLabel>Project Code:</ControlLabel>
                    <FormControl name="projectCode" value={this.state.projectCode}
                                 onChange={this.handleInputChange}/>
                </FormGroup>

                <FormGroup controlId="projectTitle">
                    <ControlLabel>Name:</ControlLabel>
                    <FormControl name="projectTitle" value={this.state.projectTitle}
                                 onChange={this.handleInputChange}/>
                </FormGroup>

                <FormGroup controlId="changeItemTitle">
                    <ControlLabel>Change Item Title:</ControlLabel>
                    <FormControl name="changeItemTitle" value={this.state.changeItemTitle}
                                 onChange={this.handleInputChange}/>
                </FormGroup>

                <FormGroup controlId="changeItemStatus">
                    <ControlLabel>Change Item Status:</ControlLabel>
                    <FormControl componentClass="select" name="changeItemStatus"
                                 value={this.state.changeItemStatus} onChange={this.handleInputChange}>
                        <option value="">Any</option>
                        <option value="New">New</option>
                        <option value="Impacting">Impacting</option>
                        <option value="Impacted">Impacted</option>
                        <option value="Returned">Returned</option>
                        <option value="Approved">Approved</option>
                        <option value="Closed">Closed</option>
                        <option value="Withdrawn">Withdrawn</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Provisional">Provisional</option>
                        <option value="On-Hold">On-Hold</option>
                        <option value="Archived">Archived</option>
                    </FormControl>
                </FormGroup>

                <LinkContainer to={'/projectSearchResults?projectCode=' + this.state.projectCode
                                 + '&projectTitle=' + this.state.projectTitle
                                 + '&changeItemTitle=' + this.state.changeItemTitle
                                 + '&changeItemStatus=' + this.state.changeItemStatus}>
                    <Button bsStyle="success" bsSize="large" block>Search Projects</Button>
                </LinkContainer>
            </Panel>
        )
    }
}