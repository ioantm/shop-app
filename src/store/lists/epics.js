import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/of";
import "rxjs/add/observable/merge";
import { combineEpics } from "redux-observable";
import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";
import { normalize } from "normalizr";
import * as listActions from "./actions";
import * as schema from "../../api/schema";
import getGraph from "../../api/graphql";

const listFields = "name, creator, assignedUsers, id";

const getListsEpic = actions$ => actions$
  .ofType(listActions.GET_LISTS_REQUEST_START)
  .map(action => {
    let fields = listFields;
    let args;
    if (action.loadShoppingItems) {
      fields = `${fields}, shoppingItems {id, name, completed}`;
      args = [ `{ lists { ${fields} } }`, { ids: action.listIds } ];
    } else {
      args = [ `{ lists { ${fields} }}` ];
    }
    return [ ...args, { ids: action.listIds } ];
  })
  .mergeMap(
    args => fromPromise(getGraph(...args))
      .map(response => normalize(response.lists, schema.arrayOfShoppingList))
      .mergeMap(
        normalized =>
          Observable.of(listActions.getListsRequestSuccess(normalized))
      )
      .catch(error => Observable.of(listActions.getListsRequestFailed(error)))
  );

const addListEpic = actions$ => actions$
  .ofType(listActions.CREATE_LIST_REQUEST_START)
  .mergeMap(
    ({ list }) => fromPromise(
      getGraph(
        `mutation CreateListItem($list: ListInput!) {
        createList(list: $list) {
          ${listFields}
        }
      }`,
        { list }
      )
    )
  )
  .map(
    result =>
      listActions.createListSuccess(
        normalize(result.createList, schema.shoppingList)
      )
  );

export default combineEpics(getListsEpic, addListEpic);
