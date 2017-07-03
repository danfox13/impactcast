import React, {Component} from 'react';

export default class ResourceSearchResults extends Component {
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading text-cente"><h1>Search Results</h1></div>
                <div className="panel-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                            <tr>
                                <th>View Team</th>
                                <th>Name</th>
                                <th>Job Title</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><a href="#" className="btn btn-success" role="button">View</a>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}