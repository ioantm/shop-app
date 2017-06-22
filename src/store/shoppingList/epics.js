// @flow

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { combineEpics } from 'redux-observable';
import { normalize } from 'normalizr';
import * as schema from '../../api/schema';
import * as shoppingListActions from './actions';
import getGraph from '../../api/graphql';
import * as shoppingListSelectors from './selectors';

const addShoppingListEpic = actions$ =>
  actions$.ofType('ADD_SHOPPING_ITEM_REQUEST')
  .mergeMap(
    ({ item, listId }) =>
      fromPromise(
        getGraph(
          `mutation addShoppingItem($item: ShoppingItemInput!, $listId: ID!) {
            addShoppingItem(item: $item, listId: $listId){
              id, name, completed
            }
          }`,
          { item, listId }
        )
      )
      .map(response =>
        shoppingListActions.addShoppingItemSuccess(
          normalize(response.addShoppingItem, schema.shoppingItem),
          listId
        )
      )
      .catch(shoppingListActions.addShoppingItemFailure)
  );

const deleteShoppingItemEpic = actions$ =>
  actions$
    .ofType('DELETE_SHOPPING_ITEM_REQUEST')
    .mergeMap(
      ({ listId, itemId }) =>
        fromPromise(
          getGraph(
            `mutation removeShoppingItem($listId: ID!, $itemId: ID!) {
              removeShoppingItem(listId: $listId, itemId: $itemId)
            }`,
            { listId, itemId }
          )
        )
        .map(() => shoppingListActions.deleteShoppingItemSuccess(itemId, listId))
        .catch(shoppingListActions.deleteShoppingItemFailure)
    );

const loadShoppingItems = actions$ => actions$
  .filter(
    action =>
      action.type === 'LOAD_SHOPPING_ITEMS_REQUEST' ||
        action.type === 'NAVIGATE' &&
          action.location.pathname.match(/\/lists\/.+/)
  )
  .map(
    action =>
      action.type === 'LOAD_SHOPPING_ITEMS_REQUEST' &&
        action.listId ||
        action.type === 'NAVIGATE' &&
          action.location.pathname.split(/\/lists\//)[1]
  )
  .mergeMap(
    listId => fromPromise(
      getGraph(
        `query getListById($id: ID) {
          list(id: $id) {
            shoppingItems {
              id,
              name,
              completed
            }
          }
        }`,
        { id: listId }
      )
    ).map(response =>
      shoppingListActions.loadShoppingItemsSuccess(
        normalize(response.list.shoppingItems, schema.arrayOfShoppingItems),
        listId
      )
    ).catch(shoppingListActions.loadShoppingItemsFailure)
  );

const editShoppingItem = (actions$, store) =>
  actions$.ofType('EDIT_SHOPPING_ITEM_REQUEST')
    .mergeMap(({ itemId, listId, props }) =>
      fromPromise(
        getGraph(
          `mutation UpdateListItem($item: ShoppingItemInput!, $listId: ID!) {
              updateShoppingItem(item: $item, listId: $listId) {
                name
                completed
                id
              }
          }`,
          { item: Object.assign({}, shoppingListSelectors.getShoppingItem(store.getState(), itemId), props), listId }
        )
      )
      .map(result =>
        shoppingListActions.editShoppingItemSuccess(
          normalize(result.updateShoppingItem, schema.shoppingItem)
        )
      )
      .catch(error => shoppingListActions.editShoppingItemFailure(error, listId, itemId))
    );

export default combineEpics(
  addShoppingListEpic,
  deleteShoppingItemEpic,
  loadShoppingItems,
  editShoppingItem
);
