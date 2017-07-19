/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';
import ProjectSearchResults from '../../components/Project/ProjectSearchResults';

export default class ProjectSearchResultsPage extends Component {
    constructor() {
        super();
        this.state = {
            results: []
        };

        this.performSearch = this.performSearch.bind(this);
    }

    componentWillMount() {
        this.performSearch();
    }

    performSearch() {
        let url = 'http://localhost:3001/searchProjects?projectCode=' + this.props.location.query.projectCode
            + '&projectTitle=' + this.props.location.query.projectTitle
            + '&changeItemTitle=' + this.props.location.query.changeItemTitle
            + '&changeItemStatus=' + this.props.location.query.changeItemStatus;
        fetch(url)
            .then(response => response.json())
            .then((result) => {
                this.setState({
                    results: result.results.results
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <ProjectSearchResults searchResults={this.state.results}/>
        )
    }
}