import React, {Component} from 'react';

class ResultRow extends Component {
    render() {
        return (
            <tr>
                <td><a href={'/team/' + this.props.team.teamName} className="btn btn-success" role="button">View</a>
                </td>
                <td>{this.props.team.teamName}</td>
                {this.props.team.teamMembers.map(teamMember =>
                    <td key={teamMember._id}>
                        <a href={'/resource/' + teamMember._id}>
                            {teamMember.resourceName}
                        </a><br/>
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
        let resultRows = this.state.results.map(function (team) {
            return <ResultRow key={team._id} team={team}/>
        });

        return (
            <div className="panel panel-default">
                <div className="panel-heading text-cente"><h1>Search Results</h1></div>
                <div className="panel-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
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
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = TeamSearchResults;