import React, {Component} from 'react';
import {Button, Panel, Table} from 'react-bootstrap';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';

class ResultRow extends Component {
    render() {
        return (
            <tr>
                <td>
                    <LinkContainer to={'/team/' + this.props.team.teamName}>
                        <Button bsStyle="success">View</Button>
                    </LinkContainer>
                </td>
                <td>{this.props.team.teamName}</td>
                {this.props.team.teamMembers.map(teamMember =>
                    <td key={teamMember._id}>
                        <Link to={'/resource/' + teamMember._id}>
                            {teamMember.resourceName}
                        </Link>
                        <br/>
                    </td>
                )}
            </tr>
        )
    }
}

class TeamSearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: this.props.searchResults
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            results: nextProps.searchResults
        });
    }

    render() {
        let resultRows = this.state.results.map(team => {
            return <ResultRow key={team._id} team={team}/>
        });

        return (
            <Panel header="Search Results" bsStyle="primary">
                <Table striped hover responsive>
                    <thead>
                    <tr>
                        <th/>
                        <th>Team Name</th>
                        <th>Team Members</th>
                    </tr>
                    </thead>
                    <tbody>
                    {resultRows}
                    </tbody>
                </Table>
            </Panel>
        )
    }
}

module.exports = TeamSearchResults;