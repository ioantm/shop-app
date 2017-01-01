import * as actions from '../actions';

const startLoadingActions = [
  actions.GET_LISTS_REQUEST_START,
];

const endLoadingActions = [
  actions.GET_LISTS_REQUEST_SUCCESS,
  actions.GET_LISTS_REQUEST_FAILED,
];

export default function getIsloading(startActions, endActions) {
  return (state = false, action) => {
    if (startActions.indexOf(action.type) >= 0) {
      return true;
    } else if (endActions.indexOf(action.type) >= 0) {
      return false;
    }

    return state;
  };
}

export const isLoading = getIsloading(startLoadingActions, endLoadingActions);
