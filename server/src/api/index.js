import { Router } from 'express';
import user from './user';

export default () => {
    let api = Router();

    api.use('/user', user());
    return api;
}