import { Action } from './actionTypes';

const startLoadingActions = [
  'GET_LISTS_REQUEST_START',
];

const endLoadingActions = [
  'GET_LISTS_REQUEST_SUCCESS',
  'GET_LISTS_REQUEST_FAILED',
];

function getIsloading(startActions: Array<Action>, endActions: Array<Action>) {
  return (state = false, action) => {
    if (startActions.indexOf(action.type) >= 0) {
      return true;
    } else if (endActions.indexOf(action.type) >= 0) {
      return false;
    }

    return state;
  };
}

export default getIsloading;
export const isLoading = getIsloading(startLoadingActions, endLoadingActions);
