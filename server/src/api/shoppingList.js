// @flow

import { Router } from 'express';
import List from '../models/List';

export default () => {
  const router = Router();
  
  router.post('/', (req, res, next) => {
    res.send([])
  });

  router.get('/', (req, res, next) => {
    List.find({ creator: req.user.email },'', (err, lists) => {
      res.send(lists);
    });
  });

  router.post('/createList', (req, res, next) => {
    //res.send(Object.assign(req.body, { id: Math.random() * 9999 }));
    const list = new List(Object.assign({}, req.body, { creator: req.user.email }));
    list.save((err) => {
      if (err){
        next(err);
      }
      res.send(list);
    });
  });

  router.post('/addShoppingItem', (req, res, next) => {
    List.findById(req.body.listId, (err, list) => {
      if (err) {
        next(err);
      }

      list.shoppingItems.push(req.body.item);
      const addedItem = list.shoppingItems[list.shoppingItems.length - 1];
      console.log('addedItem', addedItem);
      list.save((err, updatedList) => {
        if (err) {
          next(err);
        }
        res.send(addedItem);
      });
    });
  });

  router.post('/getListItems', (req, res, next) => {

  });

  return router;
};
