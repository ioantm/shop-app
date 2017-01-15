import { normalize } from 'normalizr';
import * as api from '../../api';
import * as schema from '../../api/schema';
import { Action } from '../actionTypes';

export const GET_LISTS_REQUEST_START = 'GET_LISTS_REQUEST_START';
export const GET_LISTS_REQUEST_SUCCESS = 'GET_LISTS_REQUEST_SUCCESS';
export const GET_LISTS_REQUEST_FAILED = 'GET_LISTS_REQUEST_FAILED';

export const getListsRequest = (): Action => ({
  type: GET_LISTS_REQUEST_START,
});

export const getListsRequestSuccess = (response): Action => ({
  type: GET_LISTS_REQUEST_SUCCESS,
  response,
});

export const getListsRequestFailed = (error): Action => ({
  type: GET_LISTS_REQUEST_FAILED,
  error,
});

export const CREATE_LIST_REQUEST_START = 'CREATE_LIST_REQUEST_START';
export const CREATE_LIST_REQUEST_SUCCESS = 'CREATE_LIST_REQUEST_SUCCESS';
export const CREATE_LIST_REQUEST_FAILED = 'CREATE_LIST_REQUEST_FAILED';

export const createListRequest = (list: {}): Action => ({
  type: CREATE_LIST_REQUEST_START,
  list,
});

export const createListSuccess = (response: {}): Action => ({
  type: CREATE_LIST_REQUEST_SUCCESS,
  response,
});

export const createListFailed = (error: {}): Action => ({
  type: CREATE_LIST_REQUEST_FAILED,
  error,
});


export const DELETE_LIST_REQUEST_START = 'DELETE_LIST_REQUEST_START';
export const DELETE_LIST_REQUEST_SUCCESS = 'DELETE_LIST_REQUEST_SUCCESS';
export const DELETE_LIST_REQUEST_FAILED = 'DELETE_LIST_REQUEST_FAILED';

export const deleteListRequest = (listId: string): Action => ({
  type: DELETE_LIST_REQUEST_START,
  listId,
});

export const deleteListSuccess = (listId: string): Action => ({
  type: DELETE_LIST_REQUEST_SUCCESS,
  listId,
});

export const deleteListFailed = (error: {}): Action => ({
  type: DELETE_LIST_REQUEST_FAILED,
  error,
});