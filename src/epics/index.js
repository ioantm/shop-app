import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { normalize } from 'normalizr';
import * as schema from '../actions/schema';
import * as api from '../api';
import * as actions from '../actions';

const checkError = (response) => {
  if (response.status !== 200) {
    throw response;
  }

  return response;
};

const handleUnauthorized = (error) => {
  if (error.status === 401) {
    return Observable.of(actions.navigateToSignin());
  }
  console.log('handleUnauthorized', error);
};

const loginEpic = action$ => 
  action$.ofType(actions.LOGIN_REQUEST_START)
  .switchMap(
    ({ credentials }) =>
    fromPromise(api.login(credentials))
    .flatMap(response => fromPromise(response.json()))
    .map(response => actions.loginSuccess(normalize(response, schema.user)))
    .map(actions.navigateToLists)
    .catch(error => Observable.of(actions.loginRequestFailed(error))),
  );

const navigateToListsSE = actoins$ =>
  actoins$.ofType(
    actions.LOGIN_REQUEST_SUCCESS,
    actions.GET_LISTS_REQUEST_SUCCESS,
  )
  .map(actions.navigateToLists);

const getListsEpic = actions$ =>
  actions$.ofType(actions.GET_LISTS_REQUEST_START)
  .mergeMap(
    () =>
    fromPromise(api.getLists())
    .map(checkError)
    .mergeMap(response => fromPromise(response.json()))
    .map(response => normalize(
          response,
          schema.arrayOfShoppingList,
        ))
    .mergeMap(normalized => Observable.of(actions.getListsRequestSuccess(normalized)))
    .catch(error => Observable.of(actions.getListsRequestFailed(error))),
  );

const requestFailedSE = actions$ =>
  actions$.ofType(
    actions.GET_LISTS_REQUEST_FAILED,
    actions.CREATE_LIST_REQUEST_FAILED,
  )
  .filter(action => action.error.status === 401)
  .map(actions.navigateToSignin);

const logoutEpic = actions$ =>
  actions$.ofType(actions.LOGOUT_REQUEST_START)
  .mergeMap(() =>
    fromPromise(api.logout())
      .map(actions.logoutSuccess)
      .catch(actions.logoutFailed),
  );

const logoutNavigateToSigninSE = actions$ =>
  actions$.ofType(actions.LOGOUT_REQUEST_SUCCESS)
    .map(actions.navigateToSignin);

const createListEpic = actions$ =>
  actions$.ofType(actions.CREATE_LIST_REQUEST_START)
  .mergeMap(action =>
    fromPromise(api.createList(action.list))
    .map(checkError)
    .mergeMap(response => fromPromise(response.json()))
    .map(response =>
      actions.createListSuccess(
        normalize(response, schema.shoppingList),
      ),
    )
    .catch(actions.createListFailed)
  )

export const mainEpic = combineEpics(
  loginEpic,
  navigateToListsSE,
  logoutEpic,
  logoutNavigateToSigninSE,
  getListsEpic,
  requestFailedSE,
  createListEpic,
);
