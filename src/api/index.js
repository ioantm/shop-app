import fetch from 'isomorphic-fetch';

export const login = (credentials) =>
  fetch('/api/user/login', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(credentials),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });

export const register = (userData) =>
  fetch('/api/user/signup', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(userData),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });

export const getLists = () =>
  fetch('/api/lists', {
    method: 'GET',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });

export const logout = () =>
  fetch('/api/user/logout', {
    credentials: 'same-origin',
    method: 'GET',
  });

export const createList = list =>
  fetch('/api/lists/createList', {
    method: 'POST',
    body: JSON.stringify(list),
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });

export const addShoppingItem = (item, listId) =>
  fetch('/api/lists/addShoppingItem', {
    method: 'POST',
    body: JSON.stringify({ item, listId }),
    credentials: 'include',
    headers: new Headers({
      'Content-Type': "application/json",
    }),
  });



