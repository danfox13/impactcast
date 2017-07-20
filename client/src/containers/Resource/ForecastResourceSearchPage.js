/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import ForecastResourceSearch from '../../components/Resource/ForecastResourceSearch';

export default class ForecastResourceSearchPage extends Component {
    render() {
        return (
            <ForecastResourceSearch route={'/project/' + this.props.params.projectCode
                                         + '/' + this.props.params.changeItem
                                         + '/' + this.props.params.resourceId}/>
        )
    }
}