/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {Button, Col, ControlLabel, FormControl, FormGroup, Glyphicon, InputGroup, Panel, Row,
        Table} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import {handleInputChange, submitDocument} from '../../api';

import DeleteModal from '../Shared/DeleteModal';

export default class Impact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requiredResource: '',
            impacts: [],
            month: '',
            year: '',
            days: ''
        };

        this.populate = this.populate.bind(this);

        this.handleInputChange = handleInputChange.bind(this);
        this.handleSubmit = event => {
            event.preventDefault();
            submitDocument('project/' + this.props.projectCode
                         + '/' + this.props.changeItem + '/' + this.state.requiredResource._id
                         + '/addImpact',
                {
                    year: this.state.year,
                    month: this.state.month,
                    days: this.state.days
                }, response => {
                if(response.result.route) {
                    browserHistory.push(response.result.route)
                }
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
           requiredResource: nextProps.requiredResource
        });

        this.populate(nextProps.requiredResource);
    }

    populate(requiredResource) {
        requiredResource.impact.forEach(impact => {
            let month = new Date(impact.month).toLocaleDateString('en-GB').slice(3, 10);
            this.state.impacts.push(
                <tr key={impact._id}>
                    <td>
                        <DeleteModal subjectType="Impact"
                                     subjectRoute={'/project/' + this.props.projectCode
                                                 + '/' + this.props.changeItem
                                                 + '/' + requiredResource._id
                                                 + '/' + impact._id}
                                     subjectName={month}/>
                    </td>
                    <td>{month}</td>
                    <td>{impact.days}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Panel header="Impact">
                <Row>
                    <Col sm={6}>
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="month">
                                <ControlLabel>Month:</ControlLabel>
                                <InputGroup>
                                    <InputGroup.Addon><Glyphicon glyph="calendar"/></InputGroup.Addon>
                                    <FormControl name="month" componentClass="select" required
                                                 value={this.state.month}
                                                 onChange={this.handleInputChange}>
                                        <option value=""/>
                                        <option value="0">January</option>
                                        <option value="1">February</option>
                                        <option value="2">March</option>
                                        <option value="3">April</option>
                                        <option value="4">May</option>
                                        <option value="5">June</option>
                                        <option value="6">July</option>
                                        <option value="7">August</option>
                                        <option value="8">September</option>
                                        <option value="9">October</option>
                                        <option value="10">November</option>
                                        <option value="11">December</option>
                                    </FormControl>
                                </InputGroup>
                                <FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup controlId="year">
                                <ControlLabel>Year:</ControlLabel>
                                <InputGroup>
                                    <InputGroup.Addon><Glyphicon glyph="calendar"/></InputGroup.Addon>
                                    <FormControl name="year" componentClass="select" required
                                                 value={this.state.year}
                                                 onChange={this.handleInputChange}>
                                        <option value=""/>
                                        <option value="2017">2017</option>
                                        <option value="2018">2018</option>
                                    </FormControl>
                                </InputGroup>
                                <FormControl.Feedback/>
                            </FormGroup>
                            <FormGroup controlId="days">
                                <ControlLabel>Number of Days:</ControlLabel>
                                <InputGroup>
                                    <InputGroup.Addon>1</InputGroup.Addon>
                                    <FormControl name="days" pattern="^[0-2]?[0-9]$" maxLength="2" required
                                                 value={this.state.days}
                                                 onChange={this.handleInputChange}/>
                                </InputGroup>
                                <FormControl.Feedback/>
                            </FormGroup>

                            <Button type="submit" bsStyle="success" block>
                                <Glyphicon glyph="plus"/> Add to Impact
                            </Button>
                        </form>
                    </Col>
                    <Col sm={6}>
                        <Table striped hover responsive>
                            <thead>
                            <tr>
                                <th/>
                                <th>Month</th>
                                <th>Days</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.impacts}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Panel>
        )
    }
}
