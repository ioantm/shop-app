// @flow
import { Action } from '../actionTypes';

export type SessionStateType = string | null;

export default function (
  state: SessionStateType = null,
  action: Action): SessionStateType {
  switch (action.type) {
    case 'LOGIN_REQUEST_SUCCESS':
    console.log('action.response', action.response);
      return action.response.result;
    case 'LOGOUT_REQUEST_SUCCESS':
    case 'LOGIN_REQUEST_FAILED':
      return null;
    default:
      return state;
  }
}
