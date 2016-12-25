import { combineReducers } from 'redux';
import * as actions from '../actions';
import { LOCATION_CHANGE } from 'react-router-redux';

const listsById = (state = {}, action) => {
  switch (action.type) {
    case actions.LOGOUT_REQUEST_SUCCESS:
      return {};
    default:
      if (action.response && action.response.entities) {
        return { ...state, ...action.response.entities.lists };
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
  listsById,
  selectedListId,
});
