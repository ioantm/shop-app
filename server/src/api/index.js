import { Router } from 'express';
import user from './user';

export default () => {
<<<<<<< HEAD
  const api = Router();

  api.use('/user', user(api));
  api.use('/lists', shoppingList(api));
  return api;
};
=======
    let api = Router();

    api.use('/user', user());
    return api;
}
>>>>>>> 1f1fe01010d01654b6939dd92a57fe8f6597fb68
