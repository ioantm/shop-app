import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import * as ruterActions from './actions';


export const navigateToListsSE = (actions$, { getState }) => {
  if (getState().router.location.pathname.split('/')[1] !== 'lists') {
    actions$.ofType(
      'LOGIN_REQUEST_SUCCESS',
      'GET_LISTS_REQUEST_SUCCESS',
    )
    .map(ruterActions.navigateToLists);
  }

  return Observable.of();
};

const requestFailedSE = actions$ =>
  actions$.ofType(
    'GET_LISTS_REQUEST_FAILED',
    'CREATE_LIST_REQUEST_FAILED',
  )
  .filter(action => action.error.status === 401)
  .map(ruterActions.navigateToSignin);

export default combineEpics(
  navigateToListsSE,
  requestFailedSE,
);