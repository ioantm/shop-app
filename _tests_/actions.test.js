import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';


describe('Async actions', () => {
  afterEch(() => {
    nock.cleanAll();
  });

  it('first test', () => {
    
    expect(1).toEqual(1);
  });
})