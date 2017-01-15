// @flow
import { Action } from '../actionTypes';
import { combineReducers } from 'redux';

export type ShoppingListState = {
  shoppingItemsById: { [key: string]: Object },
}

const shoppingItemsById = (state = {}, action) => {
  if (action.response &&
      action.response.entities &&
      action.response.entities.shoppingItems) {
    return Object.assign({}, state, action.response.entities.shoppingItems);
  }

  switch (action.type) {
    case 'DELETE_SHOPPING_ITEM_SUCCESS': {
      const newState = Object.assign({}, state);
      delete newState[action.itemId];
      return newState;
    }
    default:
      return state;
  }
};

type ShoppingListReducer =
  (state: ShoppingListState, action: Action) => ShoppingListState;
const reducer: ShoppingListReducer = combineReducers({
  shoppingItemsById,
});

export default reducer;

export const getShoppingItem =
  (state: { byId: {}}) => (id: string) => state.byId[id];




