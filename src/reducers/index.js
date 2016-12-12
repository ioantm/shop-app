// @flow

import { combineReducers } from 'redux';
import sessionUserId from './sessionUserId';

const rootReducer = combineReducers({
  sessionUserId,
});

export const getSessionUserId = (state: object) => state.sessionUserId;

export default rootReducer;
