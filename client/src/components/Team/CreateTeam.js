import React, {Component} from 'react';

export default class CreateTeam extends Component {
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading text-cente">
                    <h1>Create a New Team</h1>
                </div>
                <div className="panel-body">

                    <form action="/newTeam" method="post" data-toggle="validator" role="form">

                        <div className="form-group has-feedback">
                            <label htmlFor="teamName" className="control-label">Team Name:</label>

                            <div className="input-group">
                                <span className="input-group-addon">T</span>
                                <input type="text" className="form-control" id="teamName" name="teamName"
                                       required/>
                            </div>
                            <span className="glyphicon form-control-feedback" aria-hidden="true"/>
                            <div className="help-block with-errors"/>
                        </div>

                        <input type="submit" value="Create Team" className="btn btn-success btn-lg btn-block"/>
                    </form>
                </div>
            </div>
        )
    }
}