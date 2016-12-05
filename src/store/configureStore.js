// @flow

import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';

const configureStore = (preloadedState: object) => createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk),
);

export default configureStore;
