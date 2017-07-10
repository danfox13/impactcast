/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup, Glyphicon, InputGroup, Panel} from 'react-bootstrap';

export default class NewChangeItem extends Component {
    render() {
        return (
            <Panel header="New Change Item" bsStyle="primary">
                <form>
                    <FormGroup controlId="changeTitle">
                        <ControlLabel>Change Title:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="changeTitle" required/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="status">
                        <ControlLabel>Status:</ControlLabel>
                        <FormControl componentClass="select" required>
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
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="lid">
                        <ControlLabel>Live Implementation Date (LID):</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon><Glyphicon glyph="calendar"/></InputGroup.Addon>
                            <FormControl type="date" required/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="startDate">
                        <ControlLabel>Start Date:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon><Glyphicon glyph="calendar"/></InputGroup.Addon>
                            <FormControl type="date" required/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="endDate">
                        <ControlLabel>End Date:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon><Glyphicon glyph="calendar"/></InputGroup.Addon>
                            <FormControl type="date" required/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="risks">
                        <ControlLabel>Risks:</ControlLabel>
                        <FormControl componentClass="textarea" rows="3"/>
                    </FormGroup>
                    <FormGroup controlId="assumptions">
                        <ControlLabel>Assumptions:</ControlLabel>
                        <FormControl componentClass="textarea" rows="3"/>
                    </FormGroup>

                    <Button bsStyle="success" bsSize="large" block>Create Change Item</Button>
                </form>
            </Panel>
        )
    }
}