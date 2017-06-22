// @flow
import { combineReducers } from 'redux';
import { Action } from '../actionTypes';
import type { ShoppingList } from '../../types';

type ListById = {
  +[string]: ShoppingList
}

export type ListsStateType = {
  listsById: ListById
};

const list = (state: ShoppingList, action: Action): ShoppingList => {
  switch (action.type) {
    case 'ADD_SHOPPING_ITEM_SUCCESS':
      return Object.assign({}, state, {
        shoppingItems: [...state.shoppingItems, action.response.result]
      });
    case 'LOAD_SHOPPING_ITEMS_SUCCESS':
      return Object.assign({}, state, {
        shoppingItems: [...action.response.result]
      });
    case 'DELETE_SHOPPING_ITEM_SUCCESS':
      return Object.assign({}, state, {
        shoppingItems: state.shoppingItems.filter(id => id !== action.itemId)
      });
    default:
      return state;
  }
};

const listsById = (state: ListById = {}, action: Action) => {
  switch (action.type) {
    case 'LOGOUT_REQUEST_SUCCESS':
      return {};
    case 'DELETE_LIST_REQUEST_SUCCESS': {
      const newState = { ...state };
      delete newState[action.listId];
      return newState
    }
    default:
      if (
        action.response &&
        action.response.entities &&
        action.response.entities.lists
      ) {
        return { ...state, ...action.response.entities.lists };
      }

      if (action.listId) {
        return Object.assign({}, state, {
          [action.listId]: list(state[action.listId], action)
        });
      }

      return state;
  }
};

const reducer: (state: ListsStateType, action: Action) =>
  ListsStateType = combineReducers({ listsById });
export default reducer;
