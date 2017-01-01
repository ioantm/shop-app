// @flow
import { combineReducers } from 'redux';

const byId = (state = {}, action) => {
  if (action.response && action.response.entities.shoppingItems) {
    return Object.assign({}, state, action.response.entities.shoppingItems);
  }

  return state;
};


export default combineReducers({
  byId,
});

export const getShoppingItem =
  (state: { byId: {}}) => (id: string) => state.byId[id];




