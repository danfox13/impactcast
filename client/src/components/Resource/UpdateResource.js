/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup, InputGroup, Panel} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import {handleInputChange, submitDocument} from '../../api';

export default class UpdateResource extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resourceName: '',
            employeeId: '',
            location: '',
            email: '',
            role: ''
        };

        this.handleInputChange = handleInputChange.bind(this);
        this.handleSubmit = event => {
            event.preventDefault();
            submitDocument(`/resource/${this.props.resource._id}/update`, this.state,
                browserHistory.push(`/resource/${this.props.resource._id}`));
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            resourceName: nextProps.resource.resourceName,
            employeeId: nextProps.resource.employeeId,
            location: nextProps.resource.location,
            email: nextProps.resource.email,
            role: nextProps.resource.role
        })
    }

    render() {
        return (
            <Panel header="Update Resource" bsStyle="primary">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="resourceName">
                        <ControlLabel htmlFor="resourceName">Name:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="resourceName" value={this.state.resourceName}
                                         onChange={this.handleInputChange} required/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="employeeId">
                        <ControlLabel>Employee ID:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>1</InputGroup.Addon>
                            <FormControl name="employeeId" value={this.state.employeeId}
                                         onChange={this.handleInputChange} required/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="location">
                        <ControlLabel>Location:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="location" value={this.state.location}
                                         onChange={this.handleInputChange} required/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="email">
                        <ControlLabel>E-mail:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>@</InputGroup.Addon>
                            <FormControl name="email" value={this.state.email}
                                         pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
                                         onChange={this.handleInputChange} required/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="role">
                        <ControlLabel>Job Role:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="role" value={this.state.role}
                                         onChange={this.handleInputChange} required/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>

                    <Button type="submit" bsStyle="success" bsSize="large" block>Update Resource</Button>
                </form>
            </Panel>
        )
    }
}