/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {
    Button,
    Col,
    ControlLabel,
    FormControl,
    FormGroup,
    Glyphicon,
    Grid,
    InputGroup,
    Panel,
    Row,
    Table
} from 'react-bootstrap';

export default class Impact extends Component {
    render() {
        return (
            <Panel header="Impact">
                <Grid>
                    <Row>
                        <Col sm={6}>
                            <form>
                                <FormGroup controlId="month">
                                    <ControlLabel>Month:</ControlLabel>
                                    <InputGroup>
                                        <InputGroup.Addon><Glyphicon glyph="menu-down"/></InputGroup.Addon>
                                        <FormControl componentClass="select" required>
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
                                        <InputGroup.Addon><Glyphicon glyph="menu-down"/></InputGroup.Addon>
                                        <FormControl componentClass="select" required>
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
                                        <FormControl pattern="^[0-2]?[0-9]$" maxlength="2" required/>
                                    </InputGroup>
                                    <FormControl.Feedback/>
                                </FormGroup>

                                <Button bsStyle="success" block>
                                    <Glyphicon glyph="plus"/> Add to Impact
                                </Button>
                            </form>
                        </Col>
                        <Col sm={6}>
                            <Table striped hover responsive>
                                <thead>
                                <tr>
                                    <th>Month</th>
                                    <th>Days</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>MM/YYYY</td>
                                    <td>DD</td>
                                    <td>
                                        <a href="/project/:projectCode/:changeItem/:requiredResource/:impact/delete">
                                            Delete
                                        </a>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Grid>
            </Panel>
        )
    }
}
