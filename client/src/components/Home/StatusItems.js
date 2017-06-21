import React, {Component} from 'react';

export default class StatusItems extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm-3">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <center>
                                <h1>1</h1>
                                <h5>New Items</h5>
                            </center>
                        </div>
                    </div>
                </div>

                <div className="col-sm-3">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <center>
                                <h1>1</h1>
                                <h5>Items Ready to Impact</h5>
                            </center>
                        </div>
                    </div>
                </div>

                <div className="col-sm-3">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <center>
                                <h1>0</h1>
                                <h5>Rejected Impacts</h5>
                            </center>
                        </div>
                    </div>
                </div>

                <div className="col-sm-3">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <center>
                                <h1>1</h1>
                                <h5>Items Ready to Forecast</h5>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}