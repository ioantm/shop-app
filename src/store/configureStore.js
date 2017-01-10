// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { authMiddleware } from '../middlewares';
import { mainEpic } from '../epics';

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify here name, actionsBlacklist, actionsCreators and other options
      }) : compose;

const epicMiddleware = createEpicMiddleware(mainEpic);

const enhancer = composeEnhancers(
    applyMiddleware(thunk, epicMiddleware),
  );


const configureStore = preloadedState => createStore(
    rootReducer,
    preloadedState,
    enhancer,
);

export default configureStore;
