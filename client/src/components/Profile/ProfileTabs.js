import React, {Component} from 'react';
import {Media, Row, Col, Panel} from 'react-bootstrap';

export default class ProfileTabs extends Component {
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
		     </Row>
		 </Media.Body>
		)
	}
}
