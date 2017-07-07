/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';
import {Link} from 'react-router';
import {Jumbotron} from 'react-bootstrap';

export default class NotFoundPage extends Component {
    render() {
        return (
            <div className="container">
                <br/><br/>
                <Jumbotron>
                    <h1>:(</h1>
                    <h2>Page not found!</h2>
                    <br/><br/>
                    <Link to="/">Return</Link>
                </Jumbotron>
            </div>
        )
    }
}
