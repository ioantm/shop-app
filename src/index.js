// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import Root from './Root';
import configureStore from './store/configureStore';
import syncStoreWithRouter from './store/syncStoreWithRouter';
import WithStyletron from './shared/styletron/configure';

const history = createBrowserHistory();
const store = configureStore({}, history);
syncStoreWithRouter(store, history);

ReactDOM.render(
  <WithStyletron>
    <Root store={store} history={history} />
  </WithStyletron>,
  document.getElementById('root')
);

