// @flow
import { Action } from '../actionTypes';

export const addShoppingItemRequest = (item, listId) => ({
  type: 'ADD_SHOPPING_ITEM_REQUEST',
  item,
  listId
});

export const addShoppingItemSuccess = (response, listId) => ({
  type: 'ADD_SHOPPING_ITEM_SUCCESS',
  response,
  listId
});

export const addShoppingItemFailure = error => ({
  type: 'ADD_SHOPPING_ITEM_FAILURE',
  error
});

export const deleteShoppingItemRequest = (itemId: string, listId: string) => ({
  type: 'DELETE_SHOPPING_ITEM_REQUEST',
  itemId,
  listId
});

export const deleteShoppingItemSuccess = (itemId, listId) => ({
  type: 'DELETE_SHOPPING_ITEM_SUCCESS',
  itemId,
  listId
});

export const deleteShoppingItemFailure = error => ({
  type: 'DELETE_SHOPPING_ITEM_FAILURE',
  error
});

export const loadShoppingItemsRequest = listId => ({
  type: 'LOAD_SHOPPING_ITEMS_REQUEST',
  listId
});

export const loadShoppingItemsSuccess = (response, listId) => ({
  type: 'LOAD_SHOPPING_ITEMS_SUCCESS',
  response,
  listId,
});

export const loadShoppingItemsFailure = error => ({
  type: 'LOAD_SHOPPING_ITEMS_FAILURE',
  error
});

export const editShoppingItemRequest = (itemId, props, listId): Action => ({
  type: 'EDIT_SHOPPING_ITEM_REQUEST',
  itemId,
  listId,
  props
});

export const editShoppingItemSuccess = (updatedItemResponse, listId): Action => ({
  type: 'EDIT_SHOPPING_ITEM_SUCCESS',
  updatedItemResponse,
  listId
});

export const editShoppingItemFailure = (error, listId, itemId) => ({
  type: 'ADD_SHOPPING_ITEM_FAILURE',
  error,
  itemId,
  listId
});

