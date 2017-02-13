// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from 'styled-components';
import {browserHistory} from 'react-router';
import Root from './Root';
import configureStore from './store/configureStore';
import {theme} from './ui/theme';
import { syncHistoryWithStore } from 'react-router-redux';

const styleSheet = document.createElement('style');
document.head.appendChild(styleSheet);
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Root store={store} history={history} />
  </ThemeProvider>,
  document.getElementById('root')
);
