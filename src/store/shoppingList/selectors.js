import { createSelector } from 'reselect';
import { shoppingItemsMap } from '../../store/mainReducer';
import { listSelector } from '../lists/selectors';

export const getShoppingItemsSelector = createSelector(
  [listSelector, shoppingItemsMap],
  (list, items) => {
    if (!list) {
      return [];
    }

    return list.shoppingItems &&
      list.shoppingItems.filter(Boolean).map(id => items[id]) || [];
  }
);

export const getShoppingItem = (state, id) => shoppingItemsMap(state)[id];
