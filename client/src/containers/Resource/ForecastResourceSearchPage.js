/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import ForecastResourceSearch from '../../components/Resource/ForecastResourceSearch';

export default class ForecastResourceSearchPage extends Component {
    render() {
        return (
            <ForecastResourceSearch projectCode={this.props.params.projectCode}
                                    changeItem={this.props.params.changeItem}
                                    resourceId={this.props.params.resourceId}/>
        )
    }
}