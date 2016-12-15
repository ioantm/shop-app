import { Router } from 'express';
import user from './user';
import shoppingList from './shoppingList';
import { isAuthenticated } from '../config/passport';

export default (app, sessStore) => {
  const api = Router();

  api.use('/user', user(app, sessStore));
  api.use('/lists', isAuthenticated, shoppingList());
  return api;
};