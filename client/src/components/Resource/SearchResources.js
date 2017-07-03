import React, {Component} from 'react';

export default class SearchTeams extends Component {
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading text-cente"><h1>Search Resources</h1></div>
                <div className="panel-body">

                    <form action="/searchResources" method="post">
                        <div className="form-group">
                            <label htmlFor="resourceName">Name:</label>
                            <input type="text" className="form-control" id="resourceName" name="resourceName" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="employeeId">Employee ID:</label>
                            <input type="text" className="form-control" id="employeeId" name="employeeId" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Location:</label>
                            <input type="text" className="form-control" id="location" name="location" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="text" className="form-control" id="email" name="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Job Title:</label>
                            <input type="text" className="form-control" id="role" name="role" />
                        </div>
                        <input type="submit" value="Search Resources" className="btn btn-success btn-lg btn-block"/>
                    </form>
                </div>
            </div>
        )
    }
}