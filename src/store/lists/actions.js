// @flow
import type { Action } from '../actionTypes';
import type { NormalizedResponse, RequestError, ShoppingList } from '../../types';

export const GET_LISTS_REQUEST_START = 'GET_LISTS_REQUEST_START';
export const GET_LISTS_REQUEST_SUCCESS = 'GET_LISTS_REQUEST_SUCCESS';
export const GET_LISTS_REQUEST_FAILED = 'GET_LISTS_REQUEST_FAILED';

export const getListsRequest = (listIds: Array<string>, loadShoppingItems: boolean): Action => ({
  type: GET_LISTS_REQUEST_START,
  listIds,
  loadShoppingItems
});

export const getListsRequestSuccess = (response: NormalizedResponse<ShoppingList>): Action => ({
  type: GET_LISTS_REQUEST_SUCCESS,
  response
});

export const getListsRequestFailed = (error: RequestError): Action => ({
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

export const deleteListFailed = (error: RequestError): Action => ({
  type: DELETE_LIST_REQUEST_FAILED,
  error,
});
