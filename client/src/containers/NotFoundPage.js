/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';
import {Link} from 'react-router';

export default class NotFoundPage extends Component {
    render() {
        return (
            <div className="not-found">
                <h1 className="page-header">Page not found</h1>
                <p>
                    Ooops! Looks like the page you're looking for doesn't exist. <br/><br/>
                    <Link to="/">Go back to the home page</Link>
                </p>
            </div>
        )
    }
}
