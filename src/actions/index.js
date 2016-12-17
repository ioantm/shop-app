// @flow
import { browserHistory } from 'react-router';
import { normalize } from 'normalizr';
import * as api from '../api';
import * as schema from './schema';

export const LOGIN_REQUEST_START = 'LOGIN_REQUEST_START';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED';

const loginRequest = () => ({
  type: LOGIN_REQUEST_START,
});

const loginSuccess = response => ({
  type: LOGIN_REQUEST_SUCCESS,
  response,
});

const loginRequestFailed = (error) => ({
  type: LOGIN_REQUEST_FAILED,
  error,
});

export const login = credentials => (dispatch) => {
  dispatch(loginRequest());

  return api.login(credentials)
    .then(res => res.json())
    .then(
      response => dispatch(loginSuccess(normalize(response, schema.user))),
      error => dispatch(loginRequestFailed(error)),
    );
};

export const REGISTER_REQUEST_START = 'REGISTER_REQUEST_START';
export const REGISTER_REQUEST_SUCCESS = 'REGISTER_REQUEST_SUCCESS';
export const REGISTER_REQUEST_FAILED = 'REGISTER_REQUEST_FAILED';

const registerRequest = () => ({
  type: REGISTER_REQUEST_START,
})

export const register = userData => (dispatch) => {
  dispatch(registerRequest());
  return apo.register(userData);
};

export const GET_LISTS_REQUEST_START = 'GET_LISTS_REQUEST_START';
export const GET_LISTS_REQUEST_SUCCESS = 'GET_LISTS_REQUEST_SUCCESS';
export const GET_LISTS_REQUEST_FAILED = 'GET_LISTS_REQUEST_FAILED';

const getListsRequest = () => ({
  type: GET_LISTS_REQUEST_START,
});

const getListsRequestSuccess = response => ({
  type: GET_LISTS_REQUEST_SUCCESS,
  response,
});

const getListsRequestFailed = () => ({
  type: GET_LISTS_REQUEST_FAILED,
});

export const getLists = () => (dispatch) => {
  dispatch(getListsRequest());

  api.getLists().then(
    response => response.json(),
    err => getListsRequestFailed(err),
  ).then((response) => {
    if (response.status !== 401) {
      const normalizedResponse = normalize(response, schema.arrayOfShoppingList);
      dispatch(getListsRequestSuccess(normalizedResponse));
      browserHistory.push('/lists');
    } else {
      dispatch(getListsRequestFailed());
      browserHistory.push('/signin');
    }
  });
};

export const LOGOUT_REQUEST_START = 'LOGOUT_REQUEST_START';
export const LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS';
export const LOGOUT_REQUEST_FAILED = 'LOGOUT_REQUEST_FAILED';

const logoutStart = () => ({
  type: LOGOUT_REQUEST_START,
});

export const logout = () => (dispatch) => {
  dispatch(logoutStart());

  return api.logout()
    .then(() => browserHistory.push('/signin'));
};

