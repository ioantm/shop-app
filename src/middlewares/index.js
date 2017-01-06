import { navigateToSignin } from '../actions';

export const authMiddleware = store => next => (action) => {
  next(action);
  if (action.error && action.error.status === 401) {
    store.dispatch(navigateToSignin());
    throw action.error;
  }
};
