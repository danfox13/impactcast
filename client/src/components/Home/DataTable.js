import React, {Component} from 'react';

export default class DataTable extends Component {
    render() {
        return (
            <div className="col-sm-6">
                <div className="panel panel-default">
                    <div className="panel-heading text-cente"><h3>{this.props.tableHeader}</h3></div>
                    <div className="panel-body">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                <tr>
                                    <th>View Project</th>
                                    <th>Project Code</th>
                                    <th>Project Title</th>
                                    <th>Change Items</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><a href={'/project/' + this.props.viewLink} className="btn btn-success" role="button">View</a>
                                    </td>
                                    <td>{this.props.projectCode}</td>
                                    <td>{this.props.projectTitle}</td>
                                    <td>
                                        <a href={'/project/' + this.props.itemLink}>{this.props.changeItem}</a><br/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
