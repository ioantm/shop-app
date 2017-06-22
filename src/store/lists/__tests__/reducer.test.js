import reducer from '../reducers';

test('should return initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    listsById: {}
  })
});

const generateList = listOverride => ({
  name: 'My first list',
  id: 'id 1',
  creator: 'creator id',
  assignedUsers: ['uid 1', 'uid 2'],
  shoppingItems: ['item id 1', 'item id 2'],
  ...listOverride
})

test('should handle ADD_SHOPPING_ITEM_SUCCESS', () => {
  const prevState = {
    listsById: {
      'list id 1': generateList({listOverride: ['item id 1', 'item id 2']})
    }
  }
  const action = {
    type: 'ADD_SHOPPING_ITEM_SUCCESS',
    listId: 'list id 1',
    response: {
      result: 'item id 3'
    }
  }

  expect(reducer(prevState, action)).toEqual({
    listsById: {
      'list id 1': generateList({listOverride: ['item id 1', 'item id 2', 'item id 3']})
    }
  });
});

test('should handle LOAD_SHOPPING_ITEMS_SUCCESS', () => {
  const prevState = {
    listsById: {
      'list id 1': generateList({listOverride: ['item id 1', 'item id 2']})
    }
  }
  const action = {
    type: 'LOAD_SHOPPING_ITEMS_SUCCESS',
    listId: 'list id 1',
    response: {
      result: ['item id 1', 'item id 2']
    }
  }

  expect(reducer(prevState, action)).toEqual({
    listsById: {
      'list id 1': generateList({listOverride: ['item id 1', 'item id 2']})
    }
  });
});

test('should handle DELETE_SHOPPING_ITEM_SUCCESS', () => {
  const prevState = {
    listsById: {
      'list id 1': generateList({listOverride: ['item id 1', 'item id 2']})
    }
  }
  const action = {
    type: 'DELETE_SHOPPING_ITEM_SUCCESS',
    listId: 'list id 1',
    itemId: 'item id 2'
  }

  expect(reducer(prevState, action)).toEqual({
    listsById: {
      'list id 1': generateList({listOverride: ['item id 1']})
    }
  });
});
