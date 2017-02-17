// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { createBrowserHistory } from 'history';
import Root from './root';
import configureStore from './store/configureStore';
import { theme } from './ui/theme';
import syncStoreWithRouter from './store/syncStoreWithRouter';

const styleSheet = document.createElement('style');
document.head.appendChild(styleSheet);
const history = createBrowserHistory();
const store = configureStore({}, history);
syncStoreWithRouter(store, history);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Root store={store} history={history} />
  </ThemeProvider>,
  document.getElementById('root')
);
