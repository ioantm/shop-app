// @flow
import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import thunk from "redux-thunk";
import { combineEpics } from "redux-observable";
import { routerMiddleware } from 'react-router-redux';
import {browserHistory} from 'react-router';
import mainReducer from "./mainReducer";
import listsEpics from "./lists/epics";
import routerEpics from "./router/epics";
import sessionEpics from "./session/epics";
import shoppingListEpics from "./shoppingList/epics";

const composeEnhancers = process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const epicMiddleware = createEpicMiddleware(
  combineEpics(listsEpics, routerEpics, sessionEpics, shoppingListEpics)
);

const middleware = routerMiddleware(browserHistory)
const enhancer = composeEnhancers(applyMiddleware(thunk, epicMiddleware, middleware));

const configureStore = preloadedState =>
  createStore(mainReducer, preloadedState, enhancer);

export default configureStore;
