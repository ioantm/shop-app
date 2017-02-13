import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as api from '../../api';
import * as sessionActions from './actions';

function* loginUser(action) {
  try {
    const user = yield call(api.login, action.credentials);
    yield put(sessionActions.loginSuccess(user));
  } catch (e) {
    yield put(sessionActions.loginRequestFailed(e));
  }
}

function* loginSaga() {
  yield takeLatest('LOGIN_REQUEST_START', loginUser);
}

export default loginSaga;