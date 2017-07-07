import React, {Component} from 'react';
import {Button, Panel, Table} from 'react-bootstrap';

class ResultRow extends Component {
    render() {
        return (
            <tr>
                <td>
                    <Button href={'/team/' + this.props.team.teamName} bsStyle="success">View</Button>
                </td>
                <td>{this.props.team.teamName}</td>
                {this.props.team.teamMembers.map(teamMember =>
                    <td key={teamMember._id}>
                        <a href={'/resource/' + teamMember._id}>
                            {teamMember.resourceName}
                        </a>
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
            <Panel header={<div className="text-center">Search Results</div>}>
                <Table striped hover responsive>
                    <thead>
                    <tr>
                        <th>View Team</th>
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