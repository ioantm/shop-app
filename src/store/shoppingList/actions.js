export const addShoppingItemRequest = (item, listId) => ({
  type: 'ADD_SHOPPING_ITEM_REQUEST',
  item,
  listId,
});

export const addShoppingItemSuccess = (response, listId) => ({
  type: 'ADD_SHOPPING_ITEM_SUCCESS',
  response,
  listId,
});

export const addShoppingItemFailure = error => ({
  type: 'ADD_SHOPPING_ITEM_FAILURE',
  error,
});