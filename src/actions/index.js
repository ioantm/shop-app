// @flow
import { browserHistory } from 'react-router';
import { normalize } from 'normalizr';
import * as api from '../api';
import * as schema from './schema';
import * as reducers from '../reducers';

type Dispatch = ({}) => ({});

const checkAuth = (response) => {
  if (response.status == 401) {
    browserHistory.push('/signin');
    throw ({ message: 'not authenticated' });
  }

  return response;
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

export const getLists = () => (dispatch: Dispatch) => {
  dispatch(getListsRequest());

  api.getLists().then(
    (response) => {
      if (response.status === 401) {
        dispatch(getListsRequestFailed());
        browserHistory.push('/signin');
      }
      return response.json();
    },
    err => getListsRequestFailed(err),
  ).then((response) => {
    if (!response.errors) {
      const normalizedResponse = normalize(
        response,
        schema.arrayOfShoppingList,
      );
      dispatch(getListsRequestSuccess(normalizedResponse));
      if (window.location.pathname.split('/')[1] !== 'lists') {
        browserHistory.push('/lists');
      }
    } else {
      dispatch(getListsRequestFailed(response));
    }
  });
};

export const CREATE_LIST_REQUEST_START = 'CREATE_LIST_REQUEST_START';
export const CREATE_LIST_REQUEST_SUCCESS = 'CREATE_LIST_REQUEST_SUCCESS';
export const CREATE_LIST_REQUEST_FAILED = 'CREATE_LIST_REQUEST_FAILED';

export const createListStart = (list: {}) => ({
  type: CREATE_LIST_REQUEST_START,
  list,
});

export const createListSuccess = (response: {}) => ({
  type: CREATE_LIST_REQUEST_SUCCESS,
  response,
});

export const createListFailed = (error: {}) => ({
  type: CREATE_LIST_REQUEST_FAILED,
  error,
});

export const createList = (list: {}) => (dispatch: Dispatch) => {
  dispatch(createListStart(list));

  return api.createList(list)
    .then(response => checkAuth(response))
    .then(response => response.json())
    .then(
      response => dispatch(createListSuccess(
        normalize(response, schema.shoppingList),
      )),
      error => dispatch(createListFailed(error)) 
    )
}

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
    )
    .then(() => dispatch(getLists()));
};

export const REGISTER_REQUEST_START = 'REGISTER_REQUEST_START';
export const REGISTER_REQUEST_SUCCESS = 'REGISTER_REQUEST_SUCCESS';
export const REGISTER_REQUEST_FAILED = 'REGISTER_REQUEST_FAILED';

const registerRequest = () => ({
  type: REGISTER_REQUEST_START,
});

const registerSuccess = response => ({
  type: REGISTER_REQUEST_SUCCESS,
  response,
});

const registerFailed = error =>({
  type: REGISTER_REQUEST_FAILED,
  error
});

export const register = userData => (dispatch) => {
  dispatch(registerRequest());
  return api.register(userData)
    .then(response => response.json())
    .then(
      response => {
        dispatch(loginSuccess(normalize(response, schema.user)));
        dispatch(getLists());
      },
      error => dispatch(registerFailed(error)),
    );
};

export const LOGOUT_REQUEST_START = 'LOGOUT_REQUEST_START';
export const LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS';
export const LOGOUT_REQUEST_FAILED = 'LOGOUT_REQUEST_FAILED';

const logoutStart = () => ({
  type: LOGOUT_REQUEST_START,
});

const logoutSuccess = () => ({
  type: LOGOUT_REQUEST_SUCCESS,
});

export const logout = () => (dispatch) => {
  dispatch(logoutStart());

  return api.logout()
    .then(() => {
      dispatch(logoutSuccess());
      browserHistory.push('/signin');
    });
};

export const ADD_SHOPPING_ITEM_REQUEST = 'ADD_SHOPPING_ITEM_REQUEST';
export const ADD_SHOPPING_ITEM_SUCCESS = 'ADD_SHOPPING_ITEM_SUCCESS';
export const ADD_SHOPPING_ITEM_FAILURE = 'ADD_SHOPPING_ITEM_FAILURE';

const addShoppingItemRequest = item => ({
  type: ADD_SHOPPING_ITEM_REQUEST,
  item,
});

const addShoppingItemSuccess = (response, listId) => ({
  type: ADD_SHOPPING_ITEM_SUCCESS,
  response,
  listId,
});

const addShoppingItemFailure = error => ({
  type: ADD_SHOPPING_ITEM_FAILURE,
  error,
});

export const addShoppingItem = (item: {}) =>
  (dispatch: Dispatch, getState: () => {}) => {
    const listId = reducers.selectedListId(getState());
    dispatch(addShoppingItemRequest(item, listId));

    api.addShoppingItem(item, listId)
      .then(response => checkAuth(response))
      .then(respone => respone.json())
      .then(
        response => dispatch(
          addShoppingItemSuccess(normalize(response, schema.shoppingItem), listId),
        ),
        error => dispatch(addShoppingItemFailure(error)),
      );
  };

// select list item

export const SELECT_LIST = 'SELECT_LIST';

export const selectList = (listId: string) => ({
  type: SELECT_LIST,
  listId,
});



