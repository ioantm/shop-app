import reducer from '../reducers';

test('shoppingList reducer should return initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    shoppingItemsById: {}
  })
});

test('should handle DELETE_SHOPPING_ITEM_SUCCESS', () => {
  const prevState = {
    shoppingItemsById: {
      'id 1': {
        name: 'test',
        completed: false
      },
      'id 2': {
        name: 'test 2',
        completed: true
      }
    }
  }

  const action = {
    type: 'DELETE_SHOPPING_ITEM_SUCCESS',
    itemId: 'id 1'
  };

  expect(reducer(prevState, action)).toEqual({
    shoppingItemsById: {
      'id 2': {
        name: 'test 2',
        completed: true
      }
    }
  })
});

test('should handle EDIT_SHOPPING_ITEM_REQUEST', () => {
  const prevState = {
    shoppingItemsById: {
      'id 1': {
        name: 'test',
        completed: false
      },
      'id 2': {
        name: 'test 2',
        completed: true
      }
    }
  }

  const action = {
    type: 'EDIT_SHOPPING_ITEM_REQUEST',
    itemId: 'id 1',
    props: {
      completed: true,
      name: 'test'
    }
  };

  expect(reducer(prevState, action)).toEqual({
    shoppingItemsById: {
      'id 1': {
        name: 'test',
        completed: true
      },
      'id 2': {
        name: 'test 2',
        completed: true
      }
    }
  })
});
