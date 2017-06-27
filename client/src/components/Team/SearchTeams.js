import React, {Component} from 'react';

export default class SearchTeams extends Component {
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading text-cente"><h1>Search Projects</h1></div>
                <div className="panel-body">

                    <form action="/searchProjects" method="post">
                        <div className="form-group">
                            <label htmlFor="teamName">Team Name:</label>
                            <input type="text" className="form-control" id="teamName" name="teamName"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="resourceName">Resource Name:</label>
                            <input type="text" className="form-control" id="resourceName" name="resourceName"/>
                        </div>
                        <input type="submit" value="Search Projects" className="btn btn-success btn-lg btn-block"/>
                    </form>
                </div>
            </div>
        )
    }
}