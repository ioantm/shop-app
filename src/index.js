//@flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './containers/Root';
import { browserHistory } from 'react-router';
import configureStore from './store/configureStore'; 

const store = configureStore();

ReactDOM.render(
  <Root store={store} history={browserHistory}/>, 
  document.getElementById('root')
);
