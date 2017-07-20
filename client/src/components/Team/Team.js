/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';
import {Button, Col, Panel, Row} from 'react-bootstrap';
import DeleteModal from '../Shared/DeleteModal';
import {LinkContainer} from 'react-router-bootstrap';

export default class Team extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamName: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            teamName: nextProps.teamName
        });
    }

    render() {
        return (
            <Panel header={this.state.teamName} bsStyle="primary">
                <Row>
                    <Col sm={6}>
                        <LinkContainer to={`/team/${this.state.teamName}/update`}>
                            <Button bsStyle="success" block>Edit Team Details</Button>
                        </LinkContainer>
                    </Col>
                    <Col sm={6}>
                        <DeleteModal subjectType="Team"
                                     subjectRoute={`/team/${this.state.teamName}`}
                                     subjectName={this.state.teamName}/>
                    </Col>
                </Row>
            </Panel>
        )
    }
}