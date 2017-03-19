import { combineEpics } from 'redux-observable';
import listsEpics from './lists/epics';
import routerEpics from './router/epics';
import sessionEpics from './session/epics';
import shoppingListEpics from './shoppingList/epics';

export default combineEpics(
  listsEpics,
  routerEpics,
  sessionEpics,
  shoppingListEpics
);
