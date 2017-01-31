export type Action =
  | { type: "GET_LISTS_REQUEST_START" }
  | { type: "CREATE_LIST_REQUEST_START", list: Object }
  | { type: "GET_LISTS_REQUEST_START" }
  | { type: "GET_LISTS_REQUEST_SUCCESS", response: Array<any> }
  | { type: "GET_LISTS_REQUEST_FAILED", error: Object }
  | { type: "CREATE_LIST_REQUEST_START", list: Array<any> }
  | { type: "CREATE_LIST_REQUEST_SUCCESS", response: Object }
  | { type: "CREATE_LIST_REQUEST_FAILED", error: Object }
  | { type: "DELETE_LIST_REQUEST_START", list: Object }
  | { type: "DELETE_LIST_REQUEST_SUCCESS", listId: string }
  | { type: "DELETE_LIST_REQUEST_FAILED", error: Object }
  | { type: "LOGIN_REQUEST_START", credentials: Object }
  | { type: "LOGIN_REQUEST_SUCCESS", response: Object }
  | { type: "LOGIN_REQUEST_FAILED", error: Object }
  | { type: "REGISTER_REQUEST_START", credentials: Object }
  | { type: "REGISTER_REQUEST_SUCCESS", response: Object }
  | { type: "REGISTER_REQUEST_FAILED", error: Object }
  | { type: "LOGOUT_REQUEST_START" }
  | { type: "LOGOUT_REQUEST_SUCCESS" }
  | { type: "LOGOUT_REQUEST_FAILED" }
  | { type: "ADD_SHOPPING_ITEM_REQUEST", item: Object, listId: string }
  | { type: "ADD_SHOPPING_ITEM_SUCCESS", reponse: Object, listId: string }
  | { type: "ADD_SHOPPING_ITEM_FAILURE", error: Object }
  | { type: "EDIT_SHOPPING_ITEM_REQUEST", item: Object, listId: string }
  | { type: "EDIT_SHOPPING_ITEM_SUCCESS", updatedItemResponse: Object, listId: string }
  | { type: "EDIT_SHOPPING_ITEM_FAILURE", error: Object, listId: string, updatedItem: Object };

export type Dispatch = (action: Action) => any;
