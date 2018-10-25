import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
// import { middleware as reduxPackMiddleware } from 'redux-pack';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic, rootReducer } from './root';
import App from './components/app/app';

const epicMiddleware = createEpicMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
    const store = createStore(rootReducer,
        composeEnhancers(
          applyMiddleware(epicMiddleware)
        )
      );

    epicMiddleware.run(rootEpic);

    return store;
}

// const store = createStore(
//     app,
//     applyMiddleware(epicMiddleware)
// );

render(
    <Provider store={configureStore()}>
        <App />
    </Provider>,
    document.getElementById('app')
);
