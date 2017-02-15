// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from 'styled-components';
import {createBrowserHistory} from 'history';
import Root from './root';
import configureStore from './store/configureStore';
import {theme} from './ui/theme';
import { syncHistoryWithStore } from 'react-router-redux'

const styleSheet = document.createElement('style');
document.head.appendChild(styleSheet);
const history = createBrowserHistory();
const store = configureStore({
  router: {location: history.location, action: history.action}
});
const syncedHistory = syncHistoryWithStore(history, store);

console.log('hmmmmmm', Root, ThemeProvider);
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Root store={store} history={syncedHistory} />
  </ThemeProvider>,
  document.getElementById('root')
);
