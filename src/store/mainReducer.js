// @flow

import { combineReducers } from "redux";
import sessionReducer, { SessionStateType } from "./session/reducers";
import shoppingList, { ShoppingListState } from "./shoppingList/reducers";
import lists, { ListsStateType } from "./lists/reducers";
import { isLoading } from "./loadingReducer";
import router, { RouterState } from "./router/reducers";
import { Action } from "./actionTypes";

export type State = {
  sessionUserId: SessionStateType,
  lists: ListsStateType,
  shoppingList: ShoppingListState,
  isLoading: boolean,
  router: RouterState
};

export type ReducerType = (state: State, action: Action) => State;
const rootReducer: ReducerType = combineReducers({
  sessionUserId: sessionReducer,
  lists,
  shoppingList,
  isLoading,
  router
});

export default rootReducer;
export const getSessionUserId = (state: State) => state.sessionUserId;
export const listsSelector = (state: State) =>
  Object.keys(state.lists.listsById).map(lid => state.lists.listsById[lid]);
export const isLoadingSelector = (state: State) => state.isLoading;
export const listsMap = (state: State) => state.lists.listsById;
export const shoppingItemsMap = (state: State) =>
  state.shoppingList.shoppingItemsById;
export const getCurrentPathname = (state: State) =>
  state.router.location.pathname;
