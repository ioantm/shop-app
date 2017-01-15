import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { combineEpics } from 'redux-observable';
import { normalize } from 'normalizr';
import * as schema from '../../api/schema';
import * as shoppingListActions from './actions';
import * as api from '../../api';
import { checkError } from '../epicsCommonHandlers';



const addShoppingListEpic = actions$ =>
  actions$.ofType('ADD_SHOPPING_ITEM_REQUEST')
    .mergeMap(({ item, listId }) =>
      fromPromise(api.addShoppingItem(item, listId))
        .map(checkError)
        .mergeMap(response => fromPromise(response.json()))
        .map(response =>
          shoppingListActions.addShoppingItemSuccess(
            normalize(response, schema.shoppingItem),
            listId,
          ),
        )
        .catch(shoppingListActions.addShoppingItemFailure),
    );

const deleteShoppingItemEpic = actions$ =>
  actions$.ofType('DELETE_SHOPPING_ITEM_REQUEST')
    .mergeMap(({ listId, itemId }) =>
      fromPromise(api.deleteShoppingItem(listId, itemId))
        .map(checkError)
        .map(() => shoppingListActions.deleteShoppingItemSuccess(itemId, listId))
        .catch(shoppingListActions.deleteShoppingItemFailure),
    );

export default combineEpics(
  addShoppingListEpic,
  deleteShoppingItemEpic,
);
