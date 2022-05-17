/** @format */

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import todoReducer from '../reducers/todo-reducer';

const middleWares = [thunk];
middleWares.push(logger);
const composeEnhancers = compose;

const appReducer = combineReducers(
	{
		todo: todoReducer,
	},
	composeWithDevTools()
);

const configureStore = () => {
	const store = createStore(
		appReducer,
		composeEnhancers(applyMiddleware(...middleWares))
	);
	return store;
};
export default configureStore;
