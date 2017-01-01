import { combineReducers } from 'redux';
import * as actions from '../actions';
import { LOCATION_CHANGE } from 'react-router-redux';

const list = (state, action) => {
  switch (action.type) {
    case actions.ADD_SHOPPING_ITEM_SUCCESS:
    console.log('list', state, action);
      return Object.assign({}, state, {
        shoppingItems: [...state.shoppingItems, action.response.result],
      });
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case actions.LOGOUT_REQUEST_SUCCESS:
      return {};
    default:
      if (action.response && action.response.entities.lists) {
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

const selectedListId = (state = null, action) => {
  switch (action.type) {
    case actions.SELECT_LIST:
      return action.listId;
    case LOCATION_CHANGE:
      const listId = action.payload.pathname.split('/')[2];
      return listId || state;
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  selectedListId,
});
