// @flow
import { navigate } from './router/actions';

export default (store: Object, history: Object) => {
  store.subscribe(() => {
    const state = store.getState();
    const { router: { location, action }} = state;

    if (location && location.pathname !== history.location.pathname) {
      const historyAction = history[action.toLowerCase()];
      if (historyAction) {
        historyAction(location.pathname);
      }
    }
  });

  history.listen((location) => {
    if (location.pathname !== store.getState().router.location.pathname) {
      store.dispatch(
        navigate({ pathname: history.location.pathname }, history.action)
      );
    }
  });
};

