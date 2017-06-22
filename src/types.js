// @flow

export type NormalizedResponse<T> = {
  entities: {},
  result: Array<T>
}

export type RequestError = {
  message: string
}

export type ShoppingList = {
  +id: string,
  +name: string,
  +creator: string,
  +assignedUsers: Array<string>,
  +shoppingItems: Array<string>
}

export type ShoppingItem = {
  +name: string,
  +completed: string
}

export type DOMNode = {
  appendChild: (child: DOMNode) => void,
  childNodes: Array<DOMNode>,
  getBoundingClientRect: () => DOMRect,
  innerHTML: string,
  innerText: string,
  nodeName: string,
  nodeType: number,
  offsetHeight: number,
  offsetLeft: number,
  offsetParent: ?DOMNode,
  offsetTop: number,
  offsetWidth: number,
  onclick?: (evt: DOMEvent) => void,
  parentNode: DOMNode,
  removeChild: (child: DOMNode) => void,
  removeListener: (evt: string, fn: () => void) => void,
  selectionStart: number,
  selectionEnd: number,
  scrollLeft: number,
  scrollTop: number,
  style: Object,
  textContent: string,
  value: string,
  ownerDocument: Document | null,
};

export type DOMEvent = {
  cancelBubble: boolean,
  key: string,
  keyCode: number,
  pageX: number,
  pageY: number,
  preventDefault: () => void,
  stopPropagation: () => void,
  target: DOMNode,
};

export type DOMRect = {
  top: number,
  left: number,
  width: number,
  height: number,
  bottom: number,
  right: number,
};
