// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import StyletronClient from 'styletron-client';
import { StyletronProvider } from 'styletron-react';
import Root from './root';
import configureStore from './store/configureStore';

const styleSheet = document.createElement('style');
document.head.appendChild(styleSheet);
const styletron = new StyletronClient([styleSheet]);

const store = configureStore();

ReactDOM.render(
  <StyletronProvider styletron={styletron}>
    <Root store={store} history={browserHistory} />
  </StyletronProvider>,
  document.getElementById('root'),
);
