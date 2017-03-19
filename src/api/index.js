// @flow

import { ajax } from 'rxjs/observable/dom/ajax'; // path is different than the previous one!
// type RequestProps = {
//   method: 'POST' | 'GET' | 'PUT' | 'DELETE',
//   credentials: string,
//   body: object,
//   headers: object
// }

// let makeRequest = (url: string, reqProps: RequestProps) =>
//   fetch(url, reqProps)
//     .then(response => response.json())
//     .then((json) => {
//       if (json.errors && json.errors.length) {
//         throw json;
//       }
//       return json;
//     })

export const root = 'http://localhost:8080';

export const login = credentials => ajax({
  url: '/api/user/login',
  method: 'POST',
  credentials: 'include',
  responseType: 'json',
  body: credentials,
  headers: new Headers({ 'Content-Type': 'application/json' })
});

export const register = userData => fetch('/api/user/signup', {
  method: 'POST',
  credentials: 'include',
  body: JSON.stringify(userData),
  headers: new Headers({ 'Content-Type': 'application/json' })
});

export const getLists = () => fetch(`${root}/api/lists`, {
  method: 'GET',
  credentials: 'include',
  headers: new Headers({ 'Content-Type': 'application/json' })
});

export const logout = () =>
  fetch('/api/user/logout', { credentials: 'same-origin', method: 'GET' });

export const createList = list => fetch('/api/lists/createList', {
  method: 'POST',
  body: JSON.stringify(list),
  credentials: 'include',
  headers: new Headers({ 'Content-Type': 'application/json' })
});

export const addShoppingItem = (item, listId) =>
  fetch('/api/lists/addShoppingItem', {
    method: 'POST',
    body: JSON.stringify({ item, listId }),
    credentials: 'include',
    headers: new Headers({ 'Content-Type': 'application/json' })
  });

export const deleteList = (listId: string) => fetch(`/api/lists/${listId}`, {
  method: 'DELETE',
  credentials: 'include',
  headers: new Headers({ 'Content-Type': 'application/json' })
});

export const deleteShoppingItem = (listId: string, itemId: string) =>
  fetch(`/api/lists/${listId}/${itemId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: new Headers({ 'Content-Type': 'application/json' })
  });
