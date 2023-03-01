export const initialState = {
  status: 'not-authenticated',
  user: {},
  errorMessage: undefined,
};

export const authenticatedState = {
  status: 'authenticated',
  user: {
    uid: 'ABCDXYZ',
    name: 'Alvaro',
  },
  errorMessage: undefined,
};

export const notAuthenticatedState = {
  status: 'not-authenticated',
  user: {},
  errorMessage: undefined,
};
