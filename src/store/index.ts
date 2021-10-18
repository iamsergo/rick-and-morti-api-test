import createSagaMiddleware from '@redux-saga/core';
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import rootSaga from './sagas/rootSaga';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
);

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;