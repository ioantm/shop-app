// @flow
import React from 'react';
import { Provider, connect } from 'react-redux';
import { Match } from 'react-router';
import { ControlledBrowserRouter as Router } from 'react-router-addons-controlled';
import App from '../app/App';
import asyncComponent from './asyncComponent';
import * as actions from '../actions';

const AsyncLists = asyncComponent(() =>
  System.import('../list/Lists').then(module => module.default),
);

const AsyncHome = asyncComponent(() =>
  System.import('../home/Home').then(module => module.default),
);

const AsyncSignin = asyncComponent(() =>
  System.import('../session/Signin').then(module => module.default),
);

const AsyncShoppingList = asyncComponent(() =>
  System.import('../list/ShoppingList').then(module => module.default),
);

const AsyncRegister = asyncComponent(() =>
  System.import('../session/Register').then(module => module.default),
);

const Root = ({ store, history, location, action, dispatch }) =>
(
  <Provider store={store}>
    <Router
      location={location}
      action={action}
      history={history}
      onChange={(changedLocation, changedAction) => {
        console.log('changedAction', changedAction, changedLocation);
          if (changedAction === 'SYNC') {
            dispatch(actions.navigate(changedLocation, 'PUSH'))
          } else {
            dispatch(actions.navigate(changedLocation, changedAction))
          }
      }}
    >
      <App>
        <Match
          exactly
          pattern="/lists"
          component={AsyncLists}
        />
        <Match
          exactly
          pattern="/"
          component={AsyncHome}
        />
        <Match
          exactly
          pattern="/signin"
          component={AsyncSignin}
        />
        <Match
          exactly
          pattern="/lists/:listId"
          component={AsyncShoppingList}
        />
        <Match
          exactly
          pattern="/register"
          component={AsyncRegister}
        />
      </App>
    </Router>
  </Provider>
);

const mapStateToProps = state => ({
  location: state.router.location,
  action: state.router.action,
});

export default connect(mapStateToProps)(Root);
