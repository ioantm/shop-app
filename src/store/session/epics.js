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
import * as navigationActions from '../router/actions';
import * as api from '../../api';

const logoutEpic = actions$ =>
  actions$.ofType('LOGOUT_REQUEST_START')
  .mergeMap(() =>
    fromPromise(api.logout())
      .map(sessionActions.logoutSuccess)
      .catch(sessionActions.logoutFailed),
  );


const loginEpic = actions$ => 
  actions$.ofType('LOGIN_REQUEST_START')
  .switchMap(
    ({ credentials }) =>
    fromPromise(api.login(credentials))
    .mergeMap(response => fromPromise(response.json()))
    .map(response => sessionActions.loginSuccess(normalize(response, schema.user)))
    .map(navigationActions.navigateToLists)
    .catch(error => Observable.of(sessionActions.loginRequestFailed(error))),
  );

const registerEpic = actions$ =>
  actions$.ofType('REGISTER_REQUEST_START')
    .switchMap(({ userData }) =>
      fromPromise(api.register(userData))
        .mergeMap(response => fromPromise(response.json()))
        .map(sessionActions.registerSuccess)
        .catch(sessionActions.registerFailed),
    );


export default combineEpics(
  logoutEpic,
  loginEpic,
  registerEpic,
);
