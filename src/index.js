/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './assets/css/style.bundle.css';
import configureStore from './store/store';

import App from './components/routers/App';
import reportWebVitals from './reportWebVitals';
export const store = configureStore();
if (!localStorage.getItem('todos'))
	localStorage.setItem('todos', JSON.stringify([]));
const jsx = (
	<Provider store={store}>
		<App />
	</Provider>
);

ReactDOM.render(
	jsx,
	document.getElementById('root') || document.createElement('div') // for testing purposes
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
