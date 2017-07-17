/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';
import ResourceSearchResults from '../../components/Resource/ResourceSearchResults';

export default class ResourceSearchResultsPage extends Component {

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
        let url = 'http://localhost:3001/searchResources?resourceName=' + this.props.location.query.resourceName
            + '&employeeId=' + this.props.location.query.employeeId
            + '&location=' + this.props.location.query.location
            + '&email=' + this.props.location.query.email
            + '&role=' + this.props.location.query.role;
        fetch(url)
            .then(response => response.json())
            .then(result => {
                this.setState(result);
            })
            .catch(console.log);
    }

    render() {
        return (
            <ResourceSearchResults searchResults={this.state.results}/>
        )
    }
}