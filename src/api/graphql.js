import { root } from "./";

export default (query, variables) =>
  fetch(`${root}/graphql`, {
    method: "POST",
    credentials: "include",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ query, variables })
  })
    .then(response => {
      if (response.status !== 200) {
        return response.json().then(json => {
          throw ({ status: response.status, errors: json.errors });
        })
      } else {
        return response.json().then(json => json.data);
      }
    });
