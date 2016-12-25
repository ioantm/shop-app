import { Schema, arrayOf } from 'normalizr';

export const shoppingList = new Schema('lists', { idAttribute: '_id' });
export const arrayOfShoppingList = arrayOf(shoppingList);
export const shoppingItem = new Schema('shoppingItems');

export const user = new Schema('users', { idAttribute: '_id' });
export const arrayOfUsers = arrayOf(user);

shoppingList.define({
  shoppingItems: arrayOf(shoppingItem),
});