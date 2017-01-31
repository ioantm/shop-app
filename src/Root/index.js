// @flow
import React from "react";
import { Provider, connect } from "react-redux";
import { Match, Redirect } from "react-router";
import {
  ControlledBrowserRouter as Router
} from "react-router-addons-controlled";
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

const Root = ({ store, history, location, action, dispatch }) => (
  <Provider store={store}>
    <Router
      location={location}
      action={action}
      history={history}
      onChange={(changedLocation, changedAction) => {
        console.log("changedAction", changedAction, changedLocation);
        if (changedAction === "SYNC") {
          //dispatch(actions.navigate(changedLocation, 'PUSH'))
        } else {
          dispatch(rooterActions.navigate(changedLocation, changedAction));
        }
      }}
    >
      <App>
        <Match exactly pattern="/" render={() => <Redirect to="/lists" />} />
        <Match exactly pattern="/lists" component={AsyncListsScreen} />
        <Match exactly pattern="/signin" component={AsyncSigninScreen} />
        <Match
          exactly
          pattern="/lists/:listId"
          component={AsyncShoppingListScreen}
        />
        <Match exactly pattern="/register" component={AsyncRegisterScreen} />
      </App>
    </Router>
  </Provider>
);

const mapStateToProps = state => ({
  location: state.router.location,
  action: state.router.action
});

export default connect(mapStateToProps)(Root);
