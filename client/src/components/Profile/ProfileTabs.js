import React, {Component} from 'react';
import {HelpBlock, InputGroup, FormControl, Form, FormGroup, Media, Row, Col, Panel, Tabs, Tab} from 'react-bootstrap';
import './profile.css';

export default class ProfileTabs extends Component {
       constructor(props) {
	        super();
	        this.state = {
	          // Takes active tab from props if it is defined there
	          activeTab: props.activeTab || 1
	        };
	    
	        // Bind the handleSelect function already here (not in the render function)
	        this.handleSelect = this.handleSelect.bind(this);
       }

	render() {
		return (
		<Media.Body>
		    <Row>
			<Col md={6}>
			    <Panel className="panel-custom2" footer="Panel footer">
                                <font color="#465a64" size="5"><strong>Email Address</strong></font>
			    </Panel>
			    <Panel className="panel-custom2" footer="Panel footer">
                                    <img width={26} alt="" src="/img/slackLogo.svg" className="img-circle" />
                                    <font color="#465a64" size="5"><strong>Slack Handle</strong></font>
			    </Panel>
			</Col>
			<Col md={6}>

		            <Tabs activeKey={this.state.activeTab} bsStyle="tabs" onSelect={this.handleSelect}>
			        <Tab eventKey={1} title="Change Password">
                                    <Form action="/changePassword" method="post" data-toggle="validator" role="form">
                                        <FormGroup>
                                            <InputGroup>
                                                <span className="input-group-addon">T</span>
                                                <FormControl type="password" className="form-control" id="oldPassword"
                                                       name="oldPassword"
                                                       placeholder="Enter old password" required/>
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup>
                                                <span className="input-group-addon">T</span>
                                                <FormControl type="password" className="form-control" id="newPassword"
                                                       name="newPassword" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                                       placeholder="Enter new password" required/>
                                            </InputGroup>
                                            <span className="glyphicon form-control-feedback" aria-hidden="true"></span>
					    <HelpBlock className="with-errors"></HelpBlock>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup>
                                                <span className="input-group-addon">T</span>
                                                <FormControl type="password" className="form-control" id="newPasswordCheck"
                                                       name="newPasswordCheck" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                                       placeholder="Confirm new password"
                                                       data-match="#newPassword"
                                                       required />
                                            </InputGroup>
                                            <span className="glyphicon form-control-feedback" aria-hidden="true"></span>
					    <HelpBlock className="with-errors">Minimum 8 chars. Must include upper/lower case and a digit. Cannot be the same as your old password.</HelpBlock>
                                        </FormGroup>
                                            <input type="submit" value="Change Password" className="btn btn-success btn-m btn-black"/>
                                    </Form>
			        </Tab>

			        <Tab eventKey={2} title="Slack">
                                    <Form action="/changeSlack" method="post" data-toggle="validator" role="form">
                                        <FormGroup>
                                            <InputGroup>
                                                <span className="input-group-addon">#</span>
                                                <FormControl type="text" className="form-control" id="newSlack" name="newSlack" pattern="@.*"
                                                       placeholder="Enter new slack handle" required/>
                                            </InputGroup>
                                        </FormGroup>
					<FormGroup>
					    <InputGroup>
                                                <span className="input-group-addon">T</span>
                                                <FormControl type="password" className="form-control" id="password" name="password" placeholder="Enter your password"
                                                       required/>
			                    </InputGroup>
                                        </FormGroup>
                                        <FormControl type="submit" value="Change Slack Handle" className="btn btn-success btn-m btn-black"></FormControl>
                                    </Form>
				</Tab>

			        <Tab eventKey={3} title="Delete Account">
                                    <Form action="/deleteMe" method="post" data-toggle="validator" role="form">
					<FormGroup>
					    <InputGroup>
                                                <span className="input-group-addon">T</span>
                                                <FormControl type="password" id="password" name="password" placeholder="Enter your password" required/>
					    </InputGroup>
					</FormGroup>
					<FormControl type="submit" className="btn-danger btn-m btn-black" value="Permanently Delete Account"></FormControl>
                                    </Form>
				</Tab>
			    </Tabs>

			</Col>
		     </Row>
		 </Media.Body>
		)
	}

	handleSelect(selectedTab) {
	    // The active tab must be set into the state so that
	    // the Tabs component knows about the change and re-renders.
	    this.setState({
	      activeTab: selectedTab
	    });
	  }
	}

