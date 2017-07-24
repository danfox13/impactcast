/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';

import NewChangeItem from '../../components/ChangeItem/NewChangeItem';

export default class NewChangeItemPage extends Component {
    render() {
        return (
            <div>
                <NewChangeItem projectCode={this.props.params.projectCode}/>
            </div>
        )
    }
}