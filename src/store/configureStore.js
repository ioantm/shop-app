// @flow
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import mainReducer from "./mainReducer";
import createSagaMiddleware from 'redux-saga';
import loginSaga from './session/sagas';
// import listsEpics from "./lists/epics";
// import routerEpics from "./router/epics";
// import sessionEpics from "./session/epics";
// import shoppingListEpics from "./shoppingList/epics";

const composeEnhancers = process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

// const epicMiddleware = createEpicMiddleware(
//   combineEpics(listsEpics, routerEpics, sessionEpics, shoppingListEpics)
// );

const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancers(applyMiddleware(thunk, sagaMiddleware));
const configureStore = preloadedState => {
   const store = createStore(mainReducer, preloadedState, enhancer);
   sagaMiddleware.run(loginSaga);
   return store;
 } 

export default configureStore;
