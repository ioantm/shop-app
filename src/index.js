// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import Styletron from 'styletron-client';
import {StyletronProvider} from 'styletron-react';

import Root from './root';
import configureStore from './store/configureStore';
import { theme } from './ui/theme';
import syncStoreWithRouter from './store/syncStoreWithRouter';

const history = createBrowserHistory();
const store = configureStore({}, history);
syncStoreWithRouter(store, history);

const styleSheet = document.createElement('style');
document.head.appendChild(styleSheet);
const styletron = new Styletron([styleSheet]);

ReactDOM.render(
  <StyletronProvider styletron={styletron}>
    <Root store={store} history={history} />
  </StyletronProvider>,
  document.getElementById('root')
);

