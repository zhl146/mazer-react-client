import { AUTH_ERROR, AUTH_SET_PROFILE } from './auth.action';

export const initialState = {
  token: null,
  user: null,
  error: null
};

export default function AuthReducer(state = initialState, action) {
  switch ( action.type ) {
    case AUTH_SET_PROFILE:
      return ({
        ...state,
        user: action.user,
        token: action.token
      });
    case AUTH_ERROR:
      return ({
        ...state,
        error: action.error
      });
    default:
      return state;
  }
}