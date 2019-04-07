import { AUTH_START, AUTH_SUCCESS, AUTH_ERROR } from '../actionTypes/auth';

export const authStart = () => ({ type: AUTH_START });
export const authSuccess = (data) => ({
  type: AUTH_SUCCESS,
  payload: data
});

export const authError = () => ({ type: AUTH_ERROR });
