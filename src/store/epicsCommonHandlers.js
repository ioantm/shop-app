import { Observable } from 'rxjs/Observable';
import { navigateToSignin } from './router/actions';

export const checkError = (response) => {
  if (response.status !== 200) {
    throw response;
  }
  return response;
};

export const handleUnauthorized = (error) => {
  if (error.status === 401) {
    return Observable.of(navigateToSignin());
  }
  return error;
};
