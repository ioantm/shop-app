// @flow
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import React from 'react';
import routes from '../routes';

const Root = ({ store, history}) => 
(
  <Provider store={store}>
      <Router history={history} routes={routes}/>
  </Provider>
);

export default Root;
