/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import AddRequiredResource from '../../components/ChangeItem/AddRequiredResource';

export default class AddRequiredResourcePage extends Component {
    render() {
        return (
            <AddRequiredResource projectCode={this.props.params.projectCode}
                                 changeItem={this.props.params.changeItem}/>
        )
    }
}