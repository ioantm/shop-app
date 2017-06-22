// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import mainReducer from './mainReducer';
import mainEpic from './mainEpic';

const composeEnhancers = process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const epicMiddleware = createEpicMiddleware(mainEpic);

export default (preloadedState) => {
  const enhancer = composeEnhancers(applyMiddleware(thunk, epicMiddleware));

  return createStore(mainReducer, preloadedState, enhancer);
};
