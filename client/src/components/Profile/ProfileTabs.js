import React, {Component} from 'react';
import {InputGroup, Input,  FormControl, Form, FormGroup, Media, Row, Col, Panel, Nav, NavItem, Tabs, Tab} from 'react-bootstrap';

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
			    <Panel className="panel-custom2">
                                <font color="#465a64" size="5"><strong>Email Address</strong></font>
                                <Panel className="panel-footer"><font size="4"></font></Panel>
			    </Panel>
			    <Panel className="panel-custom2">
                                    <img width={20} alt="" src="/img/slackLogo.svg" className="img-circle" />
                                    <font color="#465a64" size="5"><strong>Slack Handle</strong></font>
			            <Panel className="panel-footer"><font size="4"></font></Panel>
			    </Panel>
			</Col>
			<Col md={6}>

		            <Tabs activeKey={this.state.activeTab} bsStyle="tabs" onSelect={this.handleSelect}>
			        <Tab eventKey={1} title="Change Password">content </Tab>

			        <Tab eventKey={2} title="Slack">content </Tab>

			        <Tab eventKey={5} title="Delete Account">
                                    <form action="/deleteMe" method="post" data-toggle="validator" role="form">
					<FormGroup>
					    <InputGroup>
                                                <span className="input-group-addon">T</span>
                                                <FormControl type="password" id="password" name="password" placeholder="Enter your password" required/>
					    </InputGroup>
					</FormGroup>
					<FormControl type="submit" className="btn-danger btn-m btn-black" value="Permanently Delete Account"></FormControl>
                                    </form>
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






