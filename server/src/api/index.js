import { Router } from 'express';
import user from './user';
import shoppingList from './shoppingList';

export default () => {
  const api = Router();
  const loggedIn = (req, res, next) => {
    console.log('hmm', req.isAuthenticated && req.isAuthenticated(), req.user);
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.status(401).send({ errors: [{ msg: 'Not authorized' }] });
    }
    next();
  };

  api.use('/user', user(loggedIn));
  api.use('/lists', shoppingList(loggedIn));
  return api;
};
