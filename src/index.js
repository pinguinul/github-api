import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import app from './reducers';
import App from './components/app/app';

const store = createStore(
    app,
    applyMiddleware(reduxPackMiddleware)
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
