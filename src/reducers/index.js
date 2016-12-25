// @flow
import { combineReducers } from 'redux';
import sessionUserId from './sessionUserId';
import items from './items';
import lists from './lists';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  sessionUserId,
  lists,
  items,
  routing: routerReducer,
});

export const getSessionUserId = (state: object) => state.sessionUserId;

export default rootReducer;

export const listsSelector = state =>
  Object.keys(state.lists.listsById).map(lid => state.lists.listsById[lid]);

export const selectedListId = state =>
  state.lists.selectedListId;

export const selectedList = state =>
  state.lists.listsById[selectedListId(state)];
