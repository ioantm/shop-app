// @flow

import { Router } from 'express';
import List from '../models/List';

export default () => {
  const router = Router();

  router.post('/', (req, res) => {
    res.send([])
  });

  router.get('/', (req, res) => {
    List.find({ creator: req.user.email }, '', (err, lists) => {
      res.send(lists);
    });
  });

  router.post('/createList', (req, res, next) => {
    const list = new List(Object.assign({}, req.body, { creator: req.user.email }));
    list.save((err) => {
      if (err) {
        next(err);
        return;
      }
      res.send(list);
    });
  });

  router.delete('/:listId', (req, res, next) => {
    List.findOneAndRemove({ _id: req.params.listId }, (err) => {
      if (err) {
        next(err);
      }

      res.send({ message: 'success' });
    });
  });

  router.delete('/:listId/:itemId', (req, res, next) => {
    List.findById(req.params.listId, (err, list) => {
      if (err) {
        next(err);
        return;
      }

      list.removeShoppingItem(req.params.itemId);
      list.save((listSaveErr) => {
        if (listSaveErr) {
          next(listSaveErr);
          return;
        }
        res.send({ message: 'success' });
      });
    });
  });

  router.post('/addShoppingItem', (req, res, next) => {
    List.findById(req.body.listId, (err, list) => {
      if (err) {
        next(err);
        return;
      }

      list.shoppingItems.push(req.body.item);
      const addedItem = list.shoppingItems[list.shoppingItems.length - 1];

      list.save((listSaveErr) => {
        if (listSaveErr) {
          next(listSaveErr);
          return;
        }
        res.send(addedItem);
      });
    });
  });

  router.post('/getListItems', () => {

  });

  return router;
};
