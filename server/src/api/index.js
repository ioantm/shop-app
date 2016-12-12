import { Router } from 'express';
import user from './user';
import shoppingList from './shoppingList';

export default () => {
  const api = Router();

  api.use('/user', user(api));
  api.use('/lists', shoppingList(api));
  return api;
};
