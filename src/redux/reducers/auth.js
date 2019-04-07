const INITIAL_STATE = {
  submitted: false,
  error: false,
  userInfo: {}
};

import { AUTH_START, AUTH_SUCCESS, AUTH_ERROR } from '../actionTypes/auth';

function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_START: {
      return { ...state, submitted: true };
    }
    case AUTH_SUCCESS: {
      return {
        ...state,
        userInfo: action.payload,
        submitted: false
      };
    }
    case AUTH_ERROR: {
      return { ...state, submitted: false, error: true };
    }

    default:
      return state;
  }
}
export default authReducer;
