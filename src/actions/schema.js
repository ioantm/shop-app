import { Schema, arrayOf } from 'normalizr';

export const shoppingItem = new Schema('shoppingItems', { idAttribute: '_id' });

export const user = new Schema('users', { idAttribute: '_id' });
export const arrayOfUsers = arrayOf(user);
export const shoppingList = new Schema('lists', { idAttribute: '_id' });
export const arrayOfShoppingList = arrayOf(shoppingList);
shoppingList.define({
  shoppingItems: arrayOf(shoppingItem),
});