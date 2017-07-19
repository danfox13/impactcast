import React, {Component} from 'react';
import {Col, Panel} from 'react-bootstrap';

export default class StatusItem extends Component {
    render() {
        return (
            <Col sm={3}>
                <Panel className="text-center">
                    <h1>{this.props.numberOfItems}</h1>
                    <h5>{this.props.itemHeading}</h5>
                </Panel>
            </Col>
        )
    }
}