import { Action } from '../actionTypes';

export const loginRequest = (credentials): Action => ({
  type: 'LOGIN_REQUEST_START',
  credentials,
});

export const loginSuccess = (response): Action => ({
  type: 'LOGIN_REQUEST_SUCCESS',
  response,
});

export const loginRequestFailed = (error): Action => ({
  type: 'LOGIN_REQUEST_FAILED',
  error,
});

export const registerRequest = (): Action => ({
  type: 'REGISTER_REQUEST_START',
});

export const registerSuccess = (response): Action => ({
  type: 'REGISTER_REQUEST_SUCCESS',
  response,
});

export const registerFailed = (error): Action => ({
  type: 'REGISTER_REQUEST_FAILED',
  error,
});

export const logoutRequest = (): Action => ({
  type: 'LOGOUT_REQUEST_START',
});

export const logoutSuccess = (): Action => ({
  type: 'LOGOUT_REQUEST_SUCCESS',
});

export const logoutFailed = (): Action => ({
  type: 'LOGOUT_REQUEST_FAILED',
});

// export const logout = () => (dispatch) => {
//   dispatch(logoutRequest());

//   return api.logout()
//     .then(() => {
//       dispatch(logoutSuccess());
//       //browserHistory.push('/signin');
//     });
// };