/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';

import ChangeItemDetails from '../../components/ChangeItem/ChangeItemDetails';
import RequiredResources from '../../components/ChangeItem/RequiredResources';
import {loadDocument} from '../../api';

export default class ChangeItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeItem: {}
        };

        this.loadDocument = loadDocument.bind(this);
        this.loadDocument('/project/' + this.props.params.projectCode + '/' + this.props.params.changeItem);
    }

    render() {
        return (
            <div>
                <ChangeItemDetails changeItem={this.state.changeItem}
                                   projectCode={this.props.params.projectCode}/>
                <RequiredResources changeItem={this.state.changeItem}
                                   totalManDays={this.state.totalManDays}
                                   projectCode={this.props.params.projectCode}/>
            </div>
        )
    }
}