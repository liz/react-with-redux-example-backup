import './polyfills'

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import app from './reducers';

import './index.scss';
import App from './app';
import * as serviceWorker from './serviceWorker';

const store = createStore(app);
const rootEl = document.getElementById('root');

const render = () => ReactDOM.render(
	<Provider store={store}>	
		<App apiKey={store.getState()} />
	</Provider>,
  rootEl
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

render()
store.subscribe(render)