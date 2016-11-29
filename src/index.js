// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import RootContainer from './root/RootContainer';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <RootContainer store={store} history={browserHistory} />,
  document.getElementById('root'),
);
