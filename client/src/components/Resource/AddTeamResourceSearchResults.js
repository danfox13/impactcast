/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';

class ResultRow extends Component {
    render() {
        return (
            <tr>
                <td>
                    <a href="/team/:teamName/addToTeam/:resource"
                       className="btn btn-success" role="button">Add to Team
                    </a>
                </td>
                <td>Placeholder</td>
                <td>Placeholder</td>
            </tr>
        )
    }
}

export default class AddTeamResourceSearchResults extends Component {

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
        // let resultRows = this.state.results.map(function (resource) {
        // 	return <ResultRow key={resource._id} resource={resource}/>
        // });
        return (
            <div className="panel panel-default">
                <div className="panel-heading text-cente"><h1>Search Results</h1></div>
                <div className="panel-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                            <tr>
                                <th>View Resource</th>
                                <th>Name</th>
                                <th>Job Title</th>
                            </tr>
                            </thead>
                            <tbody>
                            <ResultRow/>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}