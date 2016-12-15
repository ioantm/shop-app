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



