// @flow

import { combineReducers } from 'redux';
import sessionUserId from './sessionUserId';
import lists from './lists';

const rootReducer = combineReducers({
  sessionUserId,
  lists,
});

export const getSessionUserId = (state: object) => state.sessionUserId;

export default rootReducer;

export const listsSelector = state =>
  Object.keys(state.lists).map(lid => state.lists[lid]);
