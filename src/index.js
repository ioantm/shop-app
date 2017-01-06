// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import StyletronClient from 'styletron-client';
import { StyletronProvider } from 'styletron-react';
import { createBrowserHistory } from 'history';
import Root from './root';
import configureStore from './store/configureStore';

const styleSheet = document.createElement('style');
document.head.appendChild(styleSheet);
const styletron = new StyletronClient([styleSheet]);
window.styletron = styletron;
const history = createBrowserHistory();
const store = configureStore({
  router: {
    location: history.location,
    action: history.action,
  },
});

ReactDOM.render(
  <StyletronProvider styletron={styletron}>
    <Root 
      store={store}
      history={history}
    />
  </StyletronProvider>,
  document.getElementById('root'),
);
