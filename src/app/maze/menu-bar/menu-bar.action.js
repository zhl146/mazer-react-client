import { createErrorAction, createStaticAction, createUpdateAction } from "../../../utils/action-creator";
import { AUTH_ERROR, RESET_MAZE, SET_PROFILE, TOGGLE_HELP } from "../../../store/action-constants";
import MyFireBase from '../../../utils/auth.utils';
import axios from 'axios';
import {solutionUrl} from "../../../server/url-generator";

export const authError = error => createErrorAction(AUTH_ERROR, error);
export const setAuthProfile = (token, user) => createUpdateAction(SET_PROFILE, {token, user});
export const resetMaze = () => createStaticAction(RESET_MAZE);
export const toggleHelp = () => createStaticAction(TOGGLE_HELP);

export const submitScore = history => async (dispatch, getState) => {
  let { state, auth } = getState();

  let payload = {
    seed: state.maze.seed,
    solution: state.maze.getUserChanges(),
    user: auth.user.email
  };
  try {
    let response = await( axios.post(solutionUrl, payload) );
    console.log(response);
    history.push('/leaderboard?seed='+state.maze.seed);
  } catch(e) {
    console.log(e);
  }
};

export const firebaseLogin = () => async dispatch => {
  try {
    let response = await( MyFireBase.auth().signInWithPopup(new MyFireBase.auth.GoogleAuthProvider()) );
    dispatch(setAuthProfile(response.credential, response.user));
  }catch(ex){
    dispatch(authError(ex));
  }
};
