// @flow
import * as actions from '../actions';

export default function (state = null, action): object {
  switch (action.state) {
    case actions.LOGIN_REQUEST_SUCCESS:
      return action.response.result;
    case actions.LOGOUT_REQUEST_SUCCESS:
    case actions.LOGIN_REQUEST_FAILED:
      return null;
    default:
      return state;
  }
}
