/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import EditResource from '../../components/Resource/EditResource';

export default class EditResourcePage extends Component {
    render() {
        return (
            <EditResource resourceName={this.props.params.resourceName}/>
        )
    }
}