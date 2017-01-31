import { root } from './';

export default (query, variables) =>
  fetch(`${root}/graphql`, {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ query, variables })
  })
    .then(response => response.json())
    .then(response => response.data);
