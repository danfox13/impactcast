import React, {Component} from 'react';
import {Panel, Table} from 'react-bootstrap';
import TableButton from '../Shared/TableButton';
import {Link} from 'react-router';

class ResultRow extends Component {
    render() {
        return (
            <tr>
                <TableButton bsStyle="success" to={`/project/${this.props.project.projectCode}`}>
                    View
                </TableButton>
                <td>{this.props.project.projectCode}</td>
                <td>{this.props.project.projectTitle}</td>
                {this.props.project.changeItems.map(changeItem =>
                    <td key={changeItem._id}>
                        <Link to={'/changeItem/' + changeItem._id}>{changeItem.changeItemTitle}</Link>
                        <br/>
                    </td>
                )}
            </tr>
        )
    }
}

export default class ProjectSearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: this.props.searchResults
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            results: nextProps.searchResults
        });
    }

    render() {
        let resultRows = this.state.results.map(function (project) {
            return <ResultRow key={project._id} project={project}/>
        });

        return (
            <Panel header="Search Results" bsStyle="primary">
                <Table striped hover responsive>
                    <thead>
                    <tr>
                        <th/>
                        <th>Project Code</th>
                        <th>Project Title</th>
                        <th>Change Items</th>
                    </tr>
                    </thead>
                    <tbody>{resultRows}</tbody>
                </Table>
            </Panel>
        )
    }
}