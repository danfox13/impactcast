/**
 * Created by GWOLVERS on 28/06/2017.
 */
import React, {Component} from 'react';

export default class TeamMembers extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading text-cente"><h3>Team Members</h3></div>
                            <div className="panel-body">
                                <div className="table-responsive">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>View</th>
                                            <th>Name</th>
                                            <th>Role</th>
                                            <th>Remove</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <a href="#" className="btn btn-success btn-block"
                                                   role="button">View</a>
                                            </td>
                                            <td>Resource 1</td>
                                            <td>Super Resource</td>
                                            <td>
                                                <a href="#" className="btn btn-danger btn-block"
                                                   role="button">Remove</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <a href="#" className="btn btn-success btn-block" role="button">Add</a>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}