// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import Root from './root';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Root store={store} history={browserHistory} />,
  document.getElementById('root'),
);
