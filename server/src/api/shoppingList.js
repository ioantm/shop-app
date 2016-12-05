// @flow

import { Router } from 'express';

export default (loggedIn) => {
  const router = Router();

  router.post('/', loggedIn, (req, res, next) => {
    res.send([])
  });

  router.get('/', loggedIn, (req, res, next) => {
    res.send([{ name: 'List 1' }, { name: 'List 2' }]);
  });

  return router;
};
