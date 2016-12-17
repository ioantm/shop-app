import { Schema, arrayOf } from 'normalizr';

export const shoppingList = new Schema('lists');
export const arrayOfShoppingList = arrayOf(shoppingList);

export const user = new Schema('users', { idAttribute: '_id' });
export const arrayOfUsers = arrayOf(user);