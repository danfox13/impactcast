/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup, Glyphicon, InputGroup, Panel} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import {handleInputChange, submitDocument} from '../../api';

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

        this.handleInputChange = handleInputChange.bind(this);
        this.handleSubmit = event => {
            event.preventDefault();
            submitDocument('project/' + this.props.projectCode + '/newChangeItem',
                this.state, response => {
                    if (response.result.changeTitle) {
                        browserHistory.push('/project/' + this.props.projectCode);
                    }
                })
        }
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
                                         value={this.state.changeTitle}
                                         onChange={this.handleInputChange}/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="status">
                        <ControlLabel>Status:</ControlLabel>
                        <FormControl name="status" componentClass="select"
                                     value={this.state.status}
                                     onChange={this.handleInputChange}>
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
                            <FormControl name="lid" type="date"
                                         value={this.state.lid} onChange={this.handleInputChange}/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="startDate">
                        <ControlLabel>Start Date:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon><Glyphicon glyph="calendar"/></InputGroup.Addon>
                            <FormControl name="startDate" type="date"
                                         value={this.state.startDate} onChange={this.handleInputChange}/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="endDate">
                        <ControlLabel>End Date:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon><Glyphicon glyph="calendar"/></InputGroup.Addon>
                            <FormControl name="endDate" type="date"
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