/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';
import {Button, Col, Panel, Row, Table} from 'react-bootstrap';

class DataRow extends Component {
    render() {
        return (
            <tr>
                <td>
                    <Button href={'/resource/' + this.props.teamMember._id} bsStyle="success">View</Button>
                </td>
                <td>{this.props.teamMember.resourceName}</td>
                <td>{this.props.teamMember.role}</td>
                <td>
                    <Button href={'/team/' + this.props.team.teamName
                    + '/' + this.props.teamMember._id + '/delete'} bsStyle="danger" block>
                        Remove
                    </Button>
                </td>
            </tr>
        )
    }
}

class TeamMembers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team: {},
            teamMembers: []
        };

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            team: nextProps.team,
            teamMembers: nextProps.team.teamMembers
        });
    }

    render() {
        let dataRows = this.state.teamMembers.map(function (teamMember) {
            return <DataRow key={teamMember._id} dataItem={teamMember}/>
        });

        return (
            <Panel header="Team Members">
                <Table striped hover responsive>
                    <thead>
                    <tr>
                        <th/>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {dataRows}
                    </tr>
                    </tbody>
                </Table>
                <Row>
                    <Col sm={12}>
                        <Button bsStyle="success" block
                                href={'/team/' + this.state.team.teamName + '/addTeamMember'}>
                            Add
                        </Button>
                    </Col>
                </Row>
            </Panel>
        )
    }
}

module.exports = TeamMembers;