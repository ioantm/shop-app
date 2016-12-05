export const LOGIN_REQUEST_START = 'LOGIN_REQUEST_START';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED';

const loginRequest = () => ({
  type: LOGIN_REQUEST_START,
});

export const login = credentials => (dispatch) => {
  dispatch(loginRequest());
  return fetch('http://localhost:8000/api/user/login', {
    method: 'POST',
    mode: 'cors', 
    body: JSON.stringify(credentials),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });
};

export const REGISTER_REQUEST_START = 'REGISTER_REQUEST_START';
export const REGISTER_REQUEST_SUCCESS = 'REGISTER_REQUEST_SUCCESS';
export const REGISTER_REQUEST_FAILED = 'REGISTER_REQUEST_FAILED';

const registerRequest = () => ({
  type: REGISTER_REQUEST_START,
})

export const register = userData => (dispatch) => {
  dispatch(registerRequest());
  return fetch('http://localhost:8000/api/user/signup', {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(userData),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });
};

export const GET_LISTS_REQUEST_START = 'GET_LISTS_REQUEST_START';
export const GET_LISTS_REQUEST_SUCCESS = 'GET_LISTS_REQUEST_SUCCESS';
export const GET_LISTS_REQUEST_FAILED = 'GET_LISTS_REQUEST_FAILED';

const getListsRequest = () => ({
  type: GET_LISTS_REQUEST_START,
});

const getListsRequestSuccess = lists => ({
  type: GET_LISTS_REQUEST_SUCCESS,
  lists,
});

const getListsRequestFailed = () => ({
  type: GET_LISTS_REQUEST_FAILED
});

export const getLists = () => dispatch => {
  dispatch(getListsRequest());

  return fetch('http://localhost:8000/api/lists', {
    method: 'GET',
    mode: 'cors',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }).then(r => {
    if (r.status !== 401) {
      getListsRequestSuccess(r);
    } else {
      throw (r);
    }
  });
};

export const LOGOUT_REQUEST_START = 'LOGOUT_REQUEST_START';
export const LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS';
export const LOGOUT_REQUEST_FAILED = 'LOGOUT_REQUEST_FAILED';

const logoutStart = () => ({
  type: LOGOUT_REQUEST_START,
})

export const logout = () => dispatch => {
  dispatch(logoutStart());

  return fetch('http://localhost:8000/api/user/logout', {
    method: 'GET',
  });
};


