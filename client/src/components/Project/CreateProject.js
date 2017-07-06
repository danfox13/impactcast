import React, {Component} from 'react';

export default class CreateProject extends Component {
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading text-cente">
                    <h1>Create New Project</h1>
                </div>
                <div className="panel-body">

                    <form action="/newProject" method="post" data-toggle="validator" role="form">

                        <div className="form-group has-feedback">
                            <label htmlFor="projectCode" className="control-label">Project Code:</label>
                            <div className="input-group">
                                <span className="input-group-addon">T</span>
                                <input type="text" className="form-control" id="projectCode" name="projectCode"
                                       required/>
                            </div>
                            <span className="glyphicon form-control-feedback" aria-hidden="true"/>
                            <div className="help-block with-errors"></div>
                        </div>

                        <div className="form-group has-feedback">
                            <label htmlFor="projectName" className="control-label">Name:</label>

                            <div className="input-group">
                                <span className="input-group-addon">T</span>
                                <input type="text" className="form-control" id="projectName" name="projectName"
                                       required/>
                            </div>
                            <span className="glyphicon form-control-feedback" aria-hidden="true"/>
                            <div className="help-block with-errors"/>
                        </div>

                        <input type="submit" value="Create Project" className="btn btn-success btn-lg btn-block"/>
                    </form>
                </div>
            </div>
        )
    }
}