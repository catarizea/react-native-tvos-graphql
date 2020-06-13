import { LOGGED_IN, LOGGED_OUT } from './actionTypes';

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return { ...state, isAuthenticated: true };
    case LOGGED_OUT:
      return { ...state, isAuthenticated: false };
    default:
      return { ...state };
  }
};
