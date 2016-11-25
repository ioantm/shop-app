//@flow
import React from 'react';
import { Route, IndexRoute } from 'react-router'
import App from './app/App';
import Lists from './list/Lists';
import SignIn from './session/SignIn';
import Register from './session/Register';
import ShoppingList from './list/ShoppingList';
import Home from './home/Home';

export default (
 <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/register" component={Register}/>
    <Route path="/signin" component={SignIn}/>
    <Route path="/list/:listId" component={ShoppingList}/>
    <Route path="/lists" component={Lists}/>
  </Route>
)