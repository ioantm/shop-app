// @flow
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import mainReducer from "./mainReducer";
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

const enhancer = composeEnhancers(applyMiddleware(thunk));

const configureStore = preloadedState =>
  createStore(mainReducer, preloadedState, enhancer);

export default configureStore;
