/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';

export default class Team extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamName: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            teamName: nextProps.teamName
        });
    }

    render() {
        return (
            <div className="panel panel-default">

                <div className="panel-heading text-cente">
                    <h1>Teams</h1>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-sm-12">
                            <b>Team Name: </b>
                                {this.props.team.teamName}
                            <br/><br/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <a href="#" className="btn btn-success btn-block" role="button">Edit Team Details</a>
                        </div>
                        <div className="col-sm-6">
                            <button className="btn btn-danger btn-block" id="deleteTeamButton">Delete Team</button>

                            <div className="modal fade" id="deleteTeamModal" role="dialog">
                                <div className="modal-dialog">

                                    /* Modal content */
                                    <div className="modal-content">
                                        <div className="modal-header" style={{padding: 35 + 'px' + 50 + 'px'}}>
                                            <button type="button" className="close" data-dismiss="modal">&times;
                                            </button>
                                            <h4><span className="glyphicon glyphicon-remove"/> Remove Item</h4>
                                        </div>
                                        <div className="modal-body" style={{padding: 40 + 'px' + 50 + 'px'}}>
                                            <h5>Are you sure you want to remove {this.props.team.teamName}?</h5>
                                        </div>
                                        <div className="modal-footer">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <a href="#" className="btn btn-success btn-block"
                                                       role="button"><span className="glyphicon glyphicon-ok"/>Yes</a>
                                                </div>
                                                <div className="col-sm-6">
                                                    <button type="submit" className="btn btn-danger btn-block "
                                                            data-dismiss="modal">
                                                        <span className="glyphicon glyphicon-remove"/>
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