/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';

import UpdateChangeItem from '../../components/ChangeItem/UpdateChangeItem';
import {loadDocument} from '../../api';

export default class UpdateChangeItemPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeItem: {}
        };

        this.loadDocument = loadDocument.bind(this);
        this.loadDocument('/project/' + this.props.params.projectCode
            + '/' + this.props.params.changeItem);
    }

    render() {
        return (
            <UpdateChangeItem changeItem={this.state.changeItem}
                              projectCode={this.props.params.projectCode}/>
        )
    }
}