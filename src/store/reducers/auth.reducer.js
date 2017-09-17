import { AUTH_ERROR, SET_PROFILE } from "../action-constants";

export const initialState = {
  token: null,
  user: null,
  authError: null,
};

export default function authReducer(state = initialState, action) {
  switch ( action.type ) {
    case SET_PROFILE:
      let { user, token } = action.payload;
      return ({
        ...state,
        user,
        token
      });
    case AUTH_ERROR:
      return ({
        ...state,
        authError: action.payload
      });
    default:
      return state;
  }
}