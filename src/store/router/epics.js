import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';
import { combineEpics } from 'redux-observable';
import * as ruterActions from './actions';

// export const navigateToListsSE = (actions$, { getState }) =>
//   actions$.ofType(
//       'LOGIN_REQUEST_SUCCESS',
//       'GET_LISTS_REQUEST_SUCCESS',
//       'REGISTER_REQUEST_SUCCESS',
//     )
//     .filter(() => getState().router.location.pathname.split('/')[1] !== 'lists')
//     .map(ruterActions.navigateToLists);

export const navigateToLogin = actions$ =>
  actions$.ofType('LOGOUT_REQUEST_SUCCESS').map(ruterActions.navigateToSignin);

const requestFailedSE = actions$ =>
  actions$
    .filter(action => action.error && action.error.status === 401)
    .map(ruterActions.navigateToSignin);

export default combineEpics(requestFailedSE, navigateToLogin);
