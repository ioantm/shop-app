//@flow

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import SignIn from './session/SignIn';
import Register from './session/Register';
import ShoppingList from './list/ShoppingList';
import Lists from './list/Lists';
import Home from './home/Home';

const root = (
 <Router history={hashHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/register" component={Register}/>
    <Route path="/signin" component={SignIn}/>
    <Route path="/list/:listId" component={ShoppingList}/>
    <Route path="/lists" component={Lists}/>
  </Route>
</Router> 
);

ReactDOM.render(root, document.getElementById('root'));
