import { Schema, arrayOf } from 'normalizr';

export const shoppingItem = new Schema('shoppingItems', { idAttribute: 'id' });

export const user = new Schema('users', { idAttribute: '_id' });
export const arrayOfUsers = arrayOf(user);
export const shoppingList = new Schema('lists', { idAttribute: 'id' });
export const arrayOfShoppingList = arrayOf(shoppingList);
export const arrayOfShoppingItems = arrayOf(shoppingItem);
shoppingList.define({ shoppingItems: arrayOf(shoppingItem) });
