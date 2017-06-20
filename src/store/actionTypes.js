import type { NormalizedResponse, RequestError } from '../types';
// @flow
export type Action =
  | { type: 'GET_LISTS_REQUEST_START' }
  | { type: 'CREATE_LIST_REQUEST_START', list: Object }
  | { type: 'GET_LISTS_REQUEST_START' }
  | { type: 'GET_LISTS_REQUEST_SUCCESS', response: NormalizedResponse }
  | { type: 'GET_LISTS_REQUEST_FAILED', error: RequestError }
  | { type: 'CREATE_LIST_REQUEST_START', list: Array<any> }
  | { type: 'CREATE_LIST_REQUEST_SUCCESS', response: Object }
  | { type: 'CREATE_LIST_REQUEST_FAILED', error: RequestError }
  | { type: 'DELETE_LIST_REQUEST_START', list: Object }
  | { type: 'DELETE_LIST_REQUEST_SUCCESS', listId: string }
  | { type: 'DELETE_LIST_REQUEST_FAILED', error: RequestError }
  | { type: 'LOGIN_REQUEST_START', credentials: Object }
  | { type: 'LOGIN_REQUEST_SUCCESS', response: Object }
  | { type: 'LOGIN_REQUEST_FAILED', error: RequestError }
  | { type: 'REGISTER_REQUEST_START', credentials: Object }
  | { type: 'REGISTER_REQUEST_SUCCESS', response: Object }
  | { type: 'REGISTER_REQUEST_FAILED', error: RequestError }
  | { type: 'LOGOUT_REQUEST_START' }
  | { type: 'LOGOUT_REQUEST_SUCCESS' }
  | { type: 'LOGOUT_REQUEST_FAILED' }
  | { type: 'ADD_SHOPPING_ITEM_REQUEST', item: Object, listId: string }
  | { type: 'ADD_SHOPPING_ITEM_SUCCESS', reponse: Object, listId: string }
  | { type: 'ADD_SHOPPING_ITEM_FAILURE', error: RequestError }
  | { type: 'EDIT_SHOPPING_ITEM_REQUEST', item: Object, listId: string }
  | { type: 'EDIT_SHOPPING_ITEM_SUCCESS', updatedItemResponse: Object, listId: string }
  | { type: 'EDIT_SHOPPING_ITEM_FAILURE', error: RequestError, listId: string, updatedItem: Object }
  | { type: 'DELETE_LIST_REQUEST_START', listId: string }

export type Dispatch = (action: Action) => any;
