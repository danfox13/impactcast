import React, {Component} from 'react';

class DataRow extends Component {
    render() {
        return (
            <tr>
                <td><a href={'/project/' + this.props.dataItem.projectCode} className="btn btn-success"
                       role="button">View</a>
                </td>
                <td>{this.props.dataItem.projectCode}</td>
                <td>{this.props.dataItem.projectTitle}</td>
                {this.props.dataItem.changeItems.map(changeItem =>
                    <td key={changeItem.changeTitle}>
                        <a href={'/project/' + this.props.dataItem.projectCode + '/' + changeItem.changeTitle}>
                            {changeItem.changeTitle}
                        </a><br/>
                    </td>
                )}
            </tr>
        )
    }
}

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataItems: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataItems: nextProps.dataItems
        });
    }

    render() {
        let dataRows = this.state.dataItems.map(function (dataItem) {
            return <DataRow key={dataItem._id} dataItem={dataItem}/>
        });

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
                                {dataRows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = DataTable;