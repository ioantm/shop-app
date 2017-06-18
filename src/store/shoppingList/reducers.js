// @flow
import { combineReducers } from 'redux';
import { Action } from '../actionTypes';

export type ShoppingItem = {
  +name: string,
  +completed: string
}

type ShoppingItemsById = {
  +[key: string]: ShoppingItem
}

export type ShoppingListState = {
  +shoppingItemsById: ShoppingItemsById
}

const shoppingItemsById = (state: ShoppingItemsById = {}, action) => {
  if (
    action.response &&
    action.response.entities &&
    action.response.entities.shoppingItems
  ) {
    return Object.assign({}, state, action.response.entities.shoppingItems);
  }

  switch (action.type) {
    case 'DELETE_SHOPPING_ITEM_SUCCESS': {
      const newState = Object.assign({}, state);
      delete newState[action.itemId];
      return newState;
    }
    case 'EDIT_SHOPPING_ITEM_REQUEST':
      return Object.assign({}, state, {
        [action.itemId]: Object.assign({}, state[action.itemId], action.props)
      });
    default:
      return state;
  }
};

type ShoppingListReducer = (
  state: ShoppingListState,
  action: Action
) => ShoppingListState;
const reducer: ShoppingListReducer = combineReducers({
  shoppingItemsById
});

export default reducer;

export const getShoppingItem = (state: { byId: {} }) => (id: string) =>
  state.byId[id];
