// @flow

import { Router } from 'express';

export default () => {
  const router = Router();
  
  router.post('/', (req, res, next) => {
    res.send([])
  });

  router.get('/', (req, res, next) => {
    res.send([{ name: 'List 1' }, { name: 'List 2' }]);
  });

  return router;
};
