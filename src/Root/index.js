// @flow
import React from "react";
import { Provider, connect } from "react-redux";
import { Router, Route } from "react-router";
import App from "../containers/App";
import asyncComponent from "./asyncComponent";
import * as rooterActions from "../store/router/actions";

const AsyncListsScreen = asyncComponent(
  () =>
    System.import("../containers/ListsScreen").then(module => module.default)
);

const AsyncHome = asyncComponent(
  () => System.import("../components/Home").then(module => module.default)
);

const AsyncSigninScreen = asyncComponent(
  () =>
    System.import("../containers/SigninScreen").then(module => module.default)
);

const AsyncShoppingListScreen = asyncComponent(
  () =>
    System
      .import("../containers/ShoppingListScreen")
      .then(module => module.default)
);

const AsyncRegisterScreen = asyncComponent(
  () =>
    System.import("../containers/RegisterScreen").then(module => module.default)
);

const Root = ({ store, history }) => (
  <Provider store={store}>
    <Router
      history={history}>
      <Route path="/" component={App}>
        {/*<Route exact={true} path="/" render={() => <Redirect to="/lists" />} />*/}
        <Route path="lists" component={AsyncListsScreen} />
        <Route path="signin" component={AsyncSigninScreen} />
        <Route path="lists/:listId" component={AsyncShoppingListScreen} />
        <Route path="register" component={AsyncRegisterScreen} />
      </Route>
    </Router>
  </Provider>
);

export default Root;
