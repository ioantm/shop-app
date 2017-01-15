import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { normalize } from 'normalizr';
import * as schema from '../../api/schema';
import * as sessionActions from './actions';
import * as api from '../../api';

const logoutEpic = actions$ =>
  actions$.ofType('LOGOUT_REQUEST_START')
  .mergeMap(() =>
    fromPromise(api.logout())
      .map(sessionActions.logoutSuccess)
      .catch(sessionActions.logoutFailed),
  );


const loginEpic = action$ => 
  action$.ofType('LOGIN_REQUEST_START')
  .switchMap(
    ({ credentials }) =>
    fromPromise(api.login(credentials))
    .flatMap(response => fromPromise(response.json()))
    .map(response => sessionActions.loginSuccess(normalize(response, schema.user)))
    .map(sessionActions.navigateToLists)
    .catch(error => Observable.of(sessionActions.loginRequestFailed(error))),
  );

export default combineEpics(
  logoutEpic,
  loginEpic,
);
