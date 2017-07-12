/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup, Glyphicon, InputGroup, Panel} from 'react-bootstrap';
import {browserHistory} from 'react-router';

export default class NewChangeItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeTitle: '',
            status: 'New',
            lid: '',
            startDate: '',
            endDate: '',
            risks: '',
            assumptions: ''
        };

        this.createChangeItem = this.createChangeItem.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.createChangeItem();
    }

    createChangeItem() {
        let url = 'http://localhost:3001/project/' + this.props.projectCode + '/newChangeItem';
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                changeTitle: this.state.changeTitle,
                status: this.state.status,
                lid: this.state.lid,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                risks: this.state.risks,
                assumptions: this.state.assumptions
            })
        }).then(response => response.json())
            .then(this.handleRedirect)
            .catch(err => console.log(err));
    }

    handleRedirect(response) {
        if (response.result.changeTitle) {
            browserHistory.push('/project/' + this.props.projectCode +
                                '/' + response.result.changeTitle);
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
            <Panel header="New Change Item" bsStyle="primary">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="changeTitle">
                        <ControlLabel>Change Title:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="changeTitle" required
                                         value={this.state.changeTitle} onChange={this.handleInputChange}/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="status">
                        <ControlLabel>Status:</ControlLabel>
                        <FormControl name="status" componentClass="select" required
                                     value={this.state.status} onChange={this.handleInputChange}>
                            <option selected value="New">New</option>
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
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="lid">
                        <ControlLabel>Live Implementation Date (LID):</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon><Glyphicon glyph="calendar"/></InputGroup.Addon>
                            <FormControl name="lid" type="date" required
                                         value={this.state.lid} onChange={this.handleInputChange}/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="startDate">
                        <ControlLabel>Start Date:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon><Glyphicon glyph="calendar"/></InputGroup.Addon>
                            <FormControl name="startDate" type="date" required
                                         value={this.state.startDate} onChange={this.handleInputChange}/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="endDate">
                        <ControlLabel>End Date:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon><Glyphicon glyph="calendar"/></InputGroup.Addon>
                            <FormControl name="endDate" type="date" required
                                         value={this.state.endDate} onChange={this.handleInputChange}/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="risks">
                        <ControlLabel>Risks:</ControlLabel>
                        <FormControl name="risks" componentClass="textarea" rows="3"
                                     value={this.state.risks} onChange={this.handleInputChange}/>
                    </FormGroup>
                    <FormGroup controlId="assumptions">
                        <ControlLabel>Assumptions:</ControlLabel>
                        <FormControl name="assumptions" componentClass="textarea" rows="3"
                                     value={this.state.assumptions} onChange={this.handleInputChange}/>
                    </FormGroup>

                    <Button type="submit" bsStyle="success" bsSize="large" block>
                        Create Change Item
                    </Button>
                </form>
            </Panel>
        )
    }
}