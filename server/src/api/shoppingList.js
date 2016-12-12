// @flow

import { Router } from 'express';
import { isAuthenticated } from '../config/passport';

export default () => {
  const router = Router();
  
  router.post('/', isAuthenticated, (req, res, next) => {
    res.send([])
  });

  router.get('/', isAuthenticated, (req, res, next) => {
    res.send([{ name: 'List 1' }, { name: 'List 2' }]);
  });

  return router;
};
