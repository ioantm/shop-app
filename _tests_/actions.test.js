import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import * as actions from '../src/actions/';
import test from 'blue-tape';
import { normalize } from 'normalizr';
import * as schema from '../src/actions/schema';

const mockStore = configureMockStore([thunk]);

test('Async actions', nest => {
  nest.test('create GET_LISTS_REQUEST_SUCCESS when fetching lists', assert => {
    const response = JSON.parse(`[
      { "_id":"5856b561965e12680e285408", "name":"bla bla bla","creator":"tomovortex@yahoo.com","__v":2,"shoppingItems":[{"name":"aaa"},{"name":"fsfd","_id":"5869409b9ca1c61a2debb19e"}],"assignedUsers":[]},
      {"_id":"5856bb86965e12680e285409","name":"ffff","creator":"tomovortex@yahoo.com","__v":0,"shoppingItems":[],"assignedUsers":[]},
      {"_id":"585c3b5736b94f040b377e41","name":"hhhh","creator":"tomovortex@yahoo.com","__v":0,"shoppingItems":[],"assignedUsers":[]},
      {"_id":"585c3b8836b94f040b377e42","name":"hhhh","creator":"tomovortex@yahoo.com","__v":0,"shoppingItems":[],"assignedUsers":[]}
    ]`);

    const normalizedResponse = normalize(
      response,
      schema.arrayOfShoppingList,
    );

    nock('http://localhost:8080')
      .get('/api/lists')
      .reply(200, response);

    const expectedActions = [
      { type: actions.GET_LISTS_REQUEST_START },
      { type: actions.GET_LISTS_REQUEST_SUCCESS, response: normalizedResponse },
    ];

    const store = mockStore({ shoppingItems: { byId: {} } });

    return store.dispatch(actions.getLists())
      .then(() => {
        assert.deepEqual(store.getActions(), expectedActions);
      }, err => console.log('err', err));
  });
});
