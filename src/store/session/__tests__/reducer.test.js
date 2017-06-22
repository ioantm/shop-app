import reducer from '../reducers';

test('should return initial state', () => {
  expect(reducer(undefined, {})).toBeNull();
});

test('should handle LOGIN_REQUEST_SUCCESS', () => {
  const action = {
    type: 'LOGIN_REQUEST_SUCCESS',
    response: {
      result: 'some id'
    }
  }

  expect(reducer(null, action)).toEqual('some id');
});

test('should handle LOGOUT_REQUEST_SUCCESS', () => {
  const action = {
    type: 'LOGOUT_REQUEST_SUCCESS'
  }

  expect(reducer('some id', action)).toBeNull();
});

test('should handle LOGIN_REQUEST_FAILED', () => {
  const action = {
    type: 'LOGIN_REQUEST_FAILED'
  }

  expect(reducer('some id', action)).toBeNull();
});

