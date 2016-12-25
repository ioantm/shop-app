// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import StyletronClient from 'styletron-client';
import { StyletronProvider } from 'styletron-react';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './root';
import configureStore from './store/configureStore';

const styleSheet = document.createElement('style');
document.head.appendChild(styleSheet);
const styletron = new StyletronClient([styleSheet]);
window.styletron = styletron;
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <StyletronProvider styletron={styletron}>
    <Root store={store} history={history} />
  </StyletronProvider>,
  document.getElementById('root'),
);
