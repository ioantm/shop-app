import { combineReducers } from 'redux';
import { Action } from '../actionTypes';

export type ListsStateType = {
  listsById: { [string]: Object },
}

const list = (state, action: Action) => {
  switch (action.type) {
    case 'ADD_SHOPPING_ITEM_SUCCESS':
      return Object.assign({}, state, {
        shoppingItems: [...state.shoppingItems, action.response.result],
      });
    case 'DELETE_SHOPPING_ITEM_SUCCESS':
      return Object.assign({}, state, {
        shoppingItems: state.shoppingItems.filter(id => id !== action.itemId),
      });
    default:
      return state;
  }
};

const listsById = (state: { [key: string]: Object } = {}, action: Action) => {
  switch (action.type) {
    case 'LOGOUT_REQUEST_SUCCESS':
      return {};
    case 'DELETE_LIST_REQUEST_SUCCESS':
      delete state[action.listId]; // eslint-disable-line
      return Object.assign({}, state);
    default:
      if (action.response && action.response.entities && action.response.entities.lists) {
        return { ...state, ...action.response.entities.lists };
      }

      if (action.listId) {
        return Object.assign(
          {},
          state,
          { [action.listId]: list(state[action.listId], action) },
        );
      }
      return state;
  }
};

export default combineReducers({
  listsById,
});
