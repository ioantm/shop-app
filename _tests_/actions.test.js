import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';
import * as actions from '../src/actions/';

const mockStore = configureMockStore([thunk]);

describe('Async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('create GET_LISTS_REQUEST_SUCCESS when fetching lists', () => {
    const response = JSON.parse(`[
      { "_id":"5856b561965e12680e285408", "name":"bla bla bla","creator":"tomovortex@yahoo.com","__v":2,"shoppingItems":[{"name":"aaa"},{"name":"fsfd","_id":"5869409b9ca1c61a2debb19e"}],"assignedUsers":[]},
      {"_id":"5856bb86965e12680e285409","name":"ffff","creator":"tomovortex@yahoo.com","__v":0,"shoppingItems":[],"assignedUsers":[]},
      {"_id":"585c3b5736b94f040b377e41","name":"hhhh","creator":"tomovortex@yahoo.com","__v":0,"shoppingItems":[],"assignedUsers":[]},
      {"_id":"585c3b8836b94f040b377e42","name":"hhhh","creator":"tomovortex@yahoo.com","__v":0,"shoppingItems":[],"assignedUsers":[]}
    ]`);

    nock('/')
      .get('/api/lists')
      .reply(200, { body: response });

    const expectedActions = [
      { type: actions.GET_LISTS_REQUEST_START },
      { type: actions.GET_LISTS_REQUEST_SUCCESS, response },
    ];

    const store = mockStore({ shoppingItems: { byId: {} } });

    return store.dispatch(actions.getLists())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      }, err => console.log('err', err));
  });
});
