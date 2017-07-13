/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, ControlLabel, FormControl,
        FormGroup, Glyphicon, InputGroup, Panel} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import {handleInputChange, submitDocument} from '../../api';

export default class UpdateChangeItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeItem: '',
            changeTitle: '',
            status: '',
            lid: '',
            startDate: '',
            endDate: '',
            risks: '',
            assumptions: ''
        };

        this.handleInputChange = handleInputChange.bind(this);
        this.handleSubmit = event => {
            event.preventDefault();
            submitDocument('project/' + this.props.projectCode
                         + '/' + this.props.changeItem.changeTitle + '/update',
                {
                    changeTitle: this.state.changeTitle,
                    status: this.state.status,
                    lid: this.state.lid,
                    startDate: this.state.startDate,
                    endDate: this.state.endDate,
                    risks: this.state.risks,
                    assumptions: this.state.assumptions
                }, response => {
                if (response.result.projectCode) {
                    browserHistory.push('/project/' + response.result.projectCode +
                                        '/' + response.result.changeTitle);
                }
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            changeItem: nextProps.changeItem,
            changeTitle: nextProps.changeItem.changeTitle,
            status: nextProps.changeItem.status,
            lid: String(nextProps.changeItem.lid).slice(0, 10),
            startDate: String(nextProps.changeItem.startDate).slice(0, 10),
            endDate: String(nextProps.changeItem.endDate).slice(0, 10),
            risks: nextProps.changeItem.risks,
            assumptions: nextProps.changeItem.assumptions
        });
    }

    render() {
        return (
            <Panel header={'Update ' + this.state.changeItem.changeTitle} bsStyle="primary">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="changeTitle">
                        <ControlLabel>Change Title:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="changeTitle" required value={this.state.changeTitle}
                                         onChange={this.handleInputChange}/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="status">
                        <ControlLabel>Status:</ControlLabel>
                        <FormControl name="status" componentClass="select"
                                     value={this.state.status}
                                     onChange={this.handleInputChange}>
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
                    <FormGroup controlId="lid">
                        <ControlLabel>Live Implementation Date (LID):</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon><Glyphicon glyph="calendar"/></InputGroup.Addon>
                            <FormControl name="lid" type="date" required
                                         value={this.state.lid}
                                         onChange={this.handleInputChange}/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="startDate">
                        <ControlLabel>Start Date:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon><Glyphicon glyph="calendar"/></InputGroup.Addon>
                            <FormControl name="startDate" type="date" required
                                         value={this.state.startDate}
                                         onChange={this.handleInputChange}/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="endDate">
                        <ControlLabel>End Date:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon><Glyphicon glyph="calendar"/></InputGroup.Addon>
                            <FormControl name="endDate" type="date" required
                                         value={this.state.endDate}
                                         onChange={this.handleInputChange}/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="risks">
                        <ControlLabel>Risks:</ControlLabel>
                        <FormControl name="risks" componentClass="textarea" rows="3"
                                     value={this.state.risks}
                                     onChange={this.handleInputChange}/>
                    </FormGroup>
                    <FormGroup controlId="assumptions">
                        <ControlLabel>Assumptions:</ControlLabel>
                        <FormControl name="assumptions" componentClass="textarea" rows="3"
                                     value={this.state.assumptions}
                                     onChange={this.handleInputChange}/>
                    </FormGroup>

                    <Button type="submit" bsStyle="success" bsSize="large" block>
                        Update Change Item
                    </Button>
                </form>
            </Panel>
        )
    }
}