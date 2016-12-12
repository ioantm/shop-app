<<<<<<< HEAD
// @flow
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
=======
//@flow

>>>>>>> 1f1fe01010d01654b6939dd92a57fe8f6597fb68
import rootReducer from '../reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

console.log('rootReducer', rootReducer);
const configureStore = preloadedState => createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk)
);

export default configureStore;