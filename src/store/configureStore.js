//@flow

import rootReducer from '../reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

const configureStore = (preloadedState: object) => createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk)
);

export default configureStore;