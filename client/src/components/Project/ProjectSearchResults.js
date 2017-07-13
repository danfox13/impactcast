import React, {Component} from 'react';
import {Button, Panel, Table} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class ResultRow extends Component {
    render() {
        return (
            <tr>
                <td>
                    <LinkContainer to={'/project/' + this.props.project.projectCode}>
                        <Button bsStyle="success">View</Button>
                    </LinkContainer>
                </td>
                <td>{this.props.project.projectCode}</td>
                <td>{this.props.project.projectTitle}</td>
                {this.props.project.changeItems.map(changeItem =>
                    <td key={changeItem._id}>
                        <a href={'/changeItem/' + changeItem._id}>{changeItem.changeItemTitle}</a>
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