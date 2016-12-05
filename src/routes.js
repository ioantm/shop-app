// @flow
import App from './app/App';

function errorLoading(err) {
  console.error('Dynamic page loading failed', err);
}

function loadRoute(cb) {
  return (module) => cb(null, module.default);
}

export default {
  component: App,
  childRoutes: [
    {
      path: '/',
      getComponent(location, cb) {
        System.import('./home/Home')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
    {
      path: 'register',
      getComponent(location, cb) {
        System.import('./session/RegisterContainer')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
    {
      path: 'signin',
      getComponent(location, cb) {
        System.import('./session/SigninContainer')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
    {
      path: 'list/:listId',
      getComponent(location, cb) {
        System.import('./list/ShoppingList')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
    {
      path: 'lists',
      getComponent(location, cb) {
        System.import('./list/Lists')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
  ],
}
