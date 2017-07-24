/**
 * @author: Artur Komoter
 */

import React, {Component} from 'react';
import {browserHistory} from 'react-router';

export default class TableButton extends Component {
    render() {
        return (
            <td className={`btn btn-${this.props.bsStyle}`}
                onClick={event => {
                    event.preventDefault();
                    if(this.props.to)
                        browserHistory.push(this.props.to);
                    if(this.props.action)
                        this.props.action();
                }}>
                {this.props.children}
            </td>
        )
    }
}