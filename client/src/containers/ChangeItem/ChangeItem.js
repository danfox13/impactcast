/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';

import ChangeItemDetails from '../../components/ChangeItem/ChangeItemDetails';
import RequiredResources from '../../components/ChangeItem/RequiredResources';

export default class ChangeItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            changeItem: ''
        };
        this.loadData = this.loadData.bind(this);
    }

    componentWillMount() {
        this.loadData()
    }

    loadData() {
        let url = 'http://localhost:3001/project/' + this.props.params.projectCode
                + '/' + this.props.params.changeItem;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    changeItem: data.result.changeItem
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <ChangeItemDetails changeItem={this.state.changeItem}
                                   projectCode={this.props.params.projectCode}/>
                <RequiredResources changeItem={this.state.changeItem}
                                   projectCode={this.props.params.projectCode}/>
            </div>
        )
    }
}