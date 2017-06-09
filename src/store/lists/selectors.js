// @flow
import { createSelector } from 'reselect';
import { listsMap } from '../../store/mainReducer';

export const listSelector = (state: State, listId: string) =>
  listsMap(state)[listId];
