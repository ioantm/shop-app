export default (state = {}, action) => {
  if (action.response) {
    return { ...state, ...action.response.entities.lists };
  }

  return state;
};
