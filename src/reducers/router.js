export default (state = {}, action) => {
  if (action.type === 'NAVIGATE') {
    return {
      location: action.location,
      action: action.action,
    }
  }

  return state;
}