import React, {Component} from 'react';

export default class ResourceDetails extends Component {
    render() {
        return (
            <div className="panel panel-default">

                <div className="panel-heading text-center"><h1>Test Member</h1></div>

                <div className="panel-body">

                    <div className="row">
                        <div className="col-sm-6">
                            <b>Employee ID: </b>123456<br/><br/>
                            <b>Location: </b>Telford<br/><br/>
                        </div>

                        <div className="col-sm-6">
                            <b>Email: </b>test.member@test.com<br/><br/>
                            <b>Job Title: </b>Super Dev<br/><br/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <a href="/resource/<%= resource._id %>/update" className="btn btn-success btn-block"
                               role="button">Edit Details</a>
                        </div>
                        <div className="col-sm-6">
                            <button className="btn btn-danger btn-block" id="deleteResourceButton">Delete</button>
                            <div className="modal fade" id="deleteResourceModal" role="dialog">
                                <div className="modal-dialog">
                                    /* Modal content */
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal">&times;
                                            </button>
                                            <h4><span className="glyphicon glyphicon-remove"/>Remove Resource</h4>
                                        </div>
                                        <div className="modal-body">
                                            <h5>Are you sure you want to remove Test Member?</h5>
                                        </div>
                                        <div className="modal-footer">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <a href="/resource/<%= resource._id %>/delete"
                                                       className="btn btn-success btn-block"
                                                       role="button"><span className="glyphicon glyphicon-ok"/>
                                                        Yes</a>
                                                </div>
                                                <div className="col-sm-6">
                                                    <button type="submit" className="btn btn-danger btn-block "
                                                            data-dismiss="modal"><span
                                                        className="glyphicon glyphicon-remove"/>
                                                        No
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}