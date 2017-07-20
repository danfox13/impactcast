/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';
import {Button, Col, Panel, Row} from 'react-bootstrap';
import DeleteModal from '../Shared/DeleteModal';

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
                        <Button bsStyle="success" block>Edit Team Details</Button>
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