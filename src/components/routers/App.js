/** @format */

import React, { Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ErrorBoundary from '../extras/ErrorBoundary';
import { ListPage, Add } from './LazyLoading';
export const history = createBrowserHistory();
const App = () => (
	<Router history={history}>
		<ErrorBoundary>
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route path='/' component={ListPage} exact={true} />
					<Route path='/add' component={Add} exact={true} />
					<Route path='/edit/:id' component={Add} exact={true} />
				</Switch>
			</Suspense>
		</ErrorBoundary>
	</Router>
);

export default App;
