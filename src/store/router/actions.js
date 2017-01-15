export const NAVIGATE = 'NAVIGATE';

export const navigate = (location: {}, action: string) => ({
  type: NAVIGATE,
  location,
  action,
});

export const navigateToSignin = () =>
  navigate({ pathname: '/signin' }, 'PUSH');

export const navigateToLists = () =>
  navigate({ pathname: '/lists' }, 'PUSH');