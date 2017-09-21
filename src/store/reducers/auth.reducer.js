import { AUTH_ERROR, SET_PROFILE } from "../action-constants";

export const initialState = {
  token: null,
  user: null,
  authError: null,
};

const setProfile = ( state, { payload: { user, token} } ) => ({...state, user, token});
const authError = ( state, { payload } ) => ({...state, authError: payload});

export default function authReducer(state = initialState, action) {
  switch ( action.type ) {
    case SET_PROFILE: return setProfile(state, action);
    case AUTH_ERROR: return authError(state, action);
    default: return state;
  }
}
