import { createErrorAction, createStaticAction, createUpdateAction } from "../../../utils/action-creator";
import { AUTH_ERROR, RESET_MAZE, SET_PROFILE, TOGGLE_HELP, TOGGLE_SUBMIT } from "../../../store/action-constants";
import MyFireBase from '../../../utils/auth.utils';

export const authError = error => createErrorAction(AUTH_ERROR, error);
export const setAuthProfile = (token, user) => createUpdateAction(SET_PROFILE, {token, user});
export const resetMaze = () => createStaticAction(RESET_MAZE);
export const toggleHelp = () => createStaticAction(TOGGLE_HELP);
export const toggleSubmit = () => createStaticAction(TOGGLE_SUBMIT);

export const firebaseLogin = () => async dispatch => {
  try {
    let response = await( MyFireBase.auth().signInWithPopup(new MyFireBase.auth.GoogleAuthProvider()) );
    dispatch(setAuthProfile(response.credential, response.user));
  }catch(ex){
    dispatch(authError(ex));
  }
};
