import { LOGGED_IN, LOGGED_OUT } from './actionTypes';

export const logIn = dispatch => {
  dispatch({ type: LOGGED_IN });
};

export const logOut = dispatch => {
  dispatch({ type: LOGGED_OUT });
};
