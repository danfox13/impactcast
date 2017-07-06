import React, {Component} from 'react';

export default class CreateResource extends Component {
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading text-cente">
                    <h1>Create a new Resource</h1>
                </div>
                <div className="panel-body">

                    <form action="/newResource" method="post" data-toggle="validator" role="form">

                        <div className="form-group has-feedback">
                            <label htmlFor="resourceName" className="control-label">Name:</label>
                            <div className="input-group">
                                <span className="input-group-addon">T</span>
                                <input type="text" className="form-control" id="resourceName" name="resourceName"
                                       required/>
                            </div>
                            <span className="glyphicon form-control-feedback" aria-hidden="true"/>
                            <div className="help-block with-errors"></div>
                        </div>


                        <div className="form-group has-feedback">
                            <label htmlFor="employeeId" className="control-label">Employee ID:</label>
                            <div className="input-group">
                                <span className="input-group-addon">1</span>
                                <input type="text" className="form-control" id="employeeId" name="employeeId"
                                       pattern="^[0-9]*$"
                                       maxlength="6"/>
                            </div>
                            <span className="glyphicon form-control-feedback" aria-hidden="true"/>
                            <div className="help-block with-errors"></div>
                        </div>


                        <div className="form-group has-feedback">
                            <label htmlFor="location" className="control-label">Location:</label>
                            <div className="input-group">
                                <span className="input-group-addon">T</span>
                                <input type="text" className="form-control" id="location" name="location"/>
                            </div>
                            <span className="glyphicon form-control-feedback" aria-hidden="true"/>
                            <div className="help-block with-errors"></div>
                        </div>


                        <div className="form-group has-feedback">
                            <label htmlFor="email" className="control-label">Email:</label>
                            <div className="input-group">
                                <span className="input-group-addon">@</span>
                                <input type="text" className="form-control" id="email" name="email"
                                       pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
                                       required/>
                            </div>
                            <span className="glyphicon form-control-feedback" aria-hidden="true"/>
                            <div className="help-block with-errors"></div>
                        </div>


                        <div className="form-group has-feedback">
                            <label htmlFor="role" className="control-label">Job Title:</label>
                            <div className="input-group">
                                <span className="input-group-addon">T</span>
                                <input type="text" className="form-control" id="role" name="role" required/>
                            </div>
                            <span className="glyphicon form-control-feedback" aria-hidden="true"/>
                            <div className="help-block with-errors"></div>
                        </div>

                        <input type="submit" value="Create Resource" className="btn btn-success btn-lg btn-block"/>
                    </form>
                </div>
            </div>
        )
    }
}