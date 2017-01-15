import { Action } from '../actionTypes';

export type RouterState = {
  location: {},
  actoin: string
}

export default (state: RouterState = {}, action: Action): RouterState => {
  if (action.type === 'NAVIGATE') {
    return {
      location: action.location,
      action: action.action,
    };
  }

  return state;
};
