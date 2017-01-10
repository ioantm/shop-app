// @flow
import { combineReducers } from 'redux';
import sessionUserId from './sessionUserId';
import * as fromShoppingItems from './shoppingItems';
import lists from './lists';
import { isLoading } from './loading';
import router from './router';

const rootReducer = combineReducers({
  sessionUserId,
  lists,
  shoppingItems: fromShoppingItems.default,
  isLoading,
  router,
});

type State = {
  sessionUserId: string,
  lists: {
    byId: {};
    selectedListId: string,
  },
  shoppingItems: {
    byId: {}
  },
  isLoading: boolean,
  routing: {}
}

export const getSessionUserId = (state: State) => state.sessionUserId;

export default rootReducer;

export const listsSelector = (state: State) =>
  Object.keys(state.lists.byId).map(lid => state.lists.byId[lid]);

export const isLoadingSelector = (state: State) => state.isLoading;

export const selectedListId = (state: State) =>
  state.lists.selectedListId;

export const selectedList = (state: State) => {
  const listId = selectedListId(state);
  const getShoppingItem = fromShoppingItems.getShoppingItem(state.shoppingItems);
  const list = state.lists.byId[listId];
  if (!list) {
    return list;
  }

  return Object.assign(
    {},
    list,
    {
      shoppingItems: list.shoppingItems.map(itemId => getShoppingItem(itemId)),
    },
  );
};

export const getCurrentPathname = state => state.router.location.pathname;
