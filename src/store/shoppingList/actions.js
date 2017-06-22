// @flow
import { Action } from '../actionTypes';
import type { ShoppingList, RequestError, NormalizedResponse, ShoppingItem } from '../../types';

export const addShoppingItemRequest = (item: ShoppingItem, listId: string) => ({
  type: 'ADD_SHOPPING_ITEM_REQUEST',
  item,
  listId
});

export const addShoppingItemSuccess = (response: NormalizedResponse<ShoppingList>, listId: string) => ({
  type: 'ADD_SHOPPING_ITEM_SUCCESS',
  response,
  listId
});

export const addShoppingItemFailure = (error: RequestError) => ({
  type: 'ADD_SHOPPING_ITEM_FAILURE',
  error
});

export const deleteShoppingItemRequest = (itemId: string, listId: string) => ({
  type: 'DELETE_SHOPPING_ITEM_REQUEST',
  itemId,
  listId
});

export const deleteShoppingItemSuccess = (itemId: string, listId: string) => ({
  type: 'DELETE_SHOPPING_ITEM_SUCCESS',
  itemId,
  listId
});

export const deleteShoppingItemFailure = (error: RequestError) => ({
  type: 'DELETE_SHOPPING_ITEM_FAILURE',
  error
});

export const loadShoppingItemsRequest = (listId: string) => ({
  type: 'LOAD_SHOPPING_ITEMS_REQUEST',
  listId
});

export const loadShoppingItemsSuccess = (response: NormalizedResponse<ShoppingItem>, listId: string) => ({
  type: 'LOAD_SHOPPING_ITEMS_SUCCESS',
  response,
  listId,
});

export const loadShoppingItemsFailure = (error: RequestError) => ({
  type: 'LOAD_SHOPPING_ITEMS_FAILURE',
  error
});

export const editShoppingItemRequest = (itemId: string, props: {}, listId: string): Action => ({
  type: 'EDIT_SHOPPING_ITEM_REQUEST',
  itemId,
  listId,
  props
});

export const editShoppingItemSuccess = (updatedItemResponse: ShoppingItem, listId: string): Action => ({
  type: 'EDIT_SHOPPING_ITEM_SUCCESS',
  updatedItemResponse,
  listId
});

export const editShoppingItemFailure = (error: RequestError, listId: string, itemId: string) => ({
  type: 'ADD_SHOPPING_ITEM_FAILURE',
  error,
  itemId,
  listId
});

