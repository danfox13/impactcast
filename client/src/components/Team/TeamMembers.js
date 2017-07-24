/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert, Button, Col, Glyphicon, Panel, Row, Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import TableButton from '../Shared/TableButton';

class DataRow extends Component {
    render() {
        return (
            <tr>
                <TableButton bsStyle="success" to={`/resource/${this.props.teamMember._id}`}>
                    View
                </TableButton>
                <td>{this.props.teamMember.resourceName}</td>
                <td>{this.props.teamMember.role}</td>
                <TableButton bsStyle="danger" action={() => this.context.removeResource(this.props.teamMember._id)}>
                    Remove
                </TableButton>
            </tr>
        )
    }
}

DataRow.contextTypes = {
    removeResource: PropTypes.func
};

export default class TeamMembers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team: props.team,
            teamMembers: []
        };

        this.removeResource = this.removeResource.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            team: nextProps.team,
            teamMembers: nextProps.team.teamMembers
        });
    }

    getChildContext() {
        return {
            removeResource: this.removeResource
        }
    }

    removeResource(teamMemberId) {
        let url = '/team/' + this.state.team.teamName + '/remove/' + teamMemberId;
        fetch(url)
            .then(this.setState({
                teamMembers: this.state.teamMembers.filter(resource => {
                    return resource._id !== teamMemberId
                })
            }))
    }

    render() {
        let dataRows = this.state.teamMembers.map(teamMember => {
            return <DataRow key={teamMember._id} teamMember={teamMember} teamName={this.state.team.teamName}/>
        });

        return (
            <Panel header="Team Members">
                {this.state.teamMembers.length ?
                    <Table striped responsive>
                        <thead>
                        <tr>
                            <th/>
                            <th>Name</th>
                            <th>Role</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {dataRows}
                        </tbody>
                    </Table>
                    : <Alert bsStyle="danger">No team members</Alert>
                }
                <br/>
                <Row>
                    <Col sm={12}>
                        <LinkContainer to={'/team/' + this.state.team.teamName + '/addTeamResource'}>
                            <Button bsStyle="success" block><Glyphicon glyph="plus"/></Button>
                        </LinkContainer>
                    </Col>
                </Row>
            </Panel>
        )
    }
}

TeamMembers.childContextTypes = {
    removeResource: PropTypes.func
};