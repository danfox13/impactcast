/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';
import {Switch, Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';

import Header from './components/Shared/Header';
import HomePage from './containers/HomePage';
import NotFoundPage from './containers/NotFoundPage';

export default class AppRoutes extends Component
{
	render()
	{
		return (
			<BrowserRouter>
				<div className="container">
					<Header/>
					<Switch>
						<Route exact path="/" component={HomePage}/>
						<Route component={NotFoundPage}/>
					</Switch>
				</div>
			</BrowserRouter>
		)
	}
}
