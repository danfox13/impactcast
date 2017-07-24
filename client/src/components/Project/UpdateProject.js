/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup, InputGroup, Panel} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import {handleInputChange, submitDocument} from '../../api';

export default class UpdateProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectCode: this.props.projectCode,
            projectTitle: this.props.projectTitle
        };

        this.handleInputChange = handleInputChange.bind(this);
        this.handleSubmit = event => {
            event.preventDefault();
            submitDocument('/project/' + this.props.projectCode + '/update',
                this.state, response => {
                if (response.result.projectCode) {
                    browserHistory.push('/project/' + response.result.projectCode);
                }
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            projectTitle: nextProps.projectTitle
        });
    }

    render() {
        return (
            <Panel header={'Update ' + this.props.projectTitle} bsStyle="primary">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="projectCode">
                        <ControlLabel>Project Code:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="projectCode" value={this.state.projectCode}
                                         onChange={this.handleInputChange} required/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup controlId="projectTitle">
                        <ControlLabel>Project Title:</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>T</InputGroup.Addon>
                            <FormControl name="projectTitle" value={this.state.projectTitle}
                                         onChange={this.handleInputChange} required/>
                        </InputGroup>
                        <FormControl.Feedback/>
                    </FormGroup>

                    <Button type="submit" bsStyle="success" bsSize="large" block>Update Project</Button>
                </form>
            </Panel>
        )
    }
}