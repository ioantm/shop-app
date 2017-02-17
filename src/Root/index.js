// @flow
import React from 'react';
import { Provider, connect } from 'react-redux';
import {
  Redirect,
  Router
} from 'react-router-dom';
import Route from './Route';
import App from '../containers/App';
import asyncComponent from './asyncComponent';
import * as rooterActions from '../store/router/actions';

const AsyncListsScreen = asyncComponent(() =>
  System.import('../containers/ListsScreen')
    .then(module => module.default));

const AsyncHome = asyncComponent(() =>
  System.import('../components/Home').then(module => module.default));

const AsyncSigninScreen = asyncComponent(() =>
  System.import('../containers/SigninScreen')
    .then(module => module.default));

const AsyncShoppingListScreen = asyncComponent(() =>
  System.import('../containers/ShoppingListScreen')
    .then(module => module.default));

const AsyncRegisterScreen = asyncComponent(() =>
  System.import('../containers/RegisterScreen')
    .then(module => module.default));

const Root = ({ store, history, location, action, dispatch }) => (
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Route
          exact
          path="/"
          render={() => <Redirect to="/lists" />}
        />
        <Route path="/lists" component={AsyncListsScreen} />
        <Route path="/signin" component={AsyncSigninScreen} />
        <Route
          path="/lists/:listId"
          component={AsyncShoppingListScreen}
        />
        <Route path="/register" component={AsyncRegisterScreen} />
      </App>
    </Router>
  </Provider>
);

const mapStateToProps = state => ({
  location: state.router.location,
  action: state.router.action
});

export default connect(mapStateToProps)(Root);
