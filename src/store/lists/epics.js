import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { normalize } from 'normalizr';
import * as listActions from './actions';
import * as schema from '../../api/schema';
import * as api from '../../api';
import { checkError } from '../epicsCommonHandlers';

const getListsEpic = actions$ =>
  actions$.ofType(listActions.GET_LISTS_REQUEST_START)
  .mergeMap(
    () =>
    fromPromise(api.getLists())
    .map(checkError)
    .mergeMap(response => fromPromise(response.json()))
    .map(response => normalize(
          response,
          schema.arrayOfShoppingList,
        ))
    .mergeMap(normalized => Observable.of(listActions.getListsRequestSuccess(normalized)))
    .catch(error => Observable.of(listActions.getListsRequestFailed(error))),
  );

export default combineEpics(
  getListsEpic,
);
