import { RESET_ACTIONERROR, RESET_PATHERROR } from "../maze.action";

export const UPDATE_MAZE = 'UPDATE_MAZE';

export const doAction = payload => ({type: UPDATE_MAZE, payload});

export const clickTile = tile => (dispatch, getState) => {
  dispatch(doAction(tile));
  setTimeout(() => {
    if (getState().appState.pathError) {
      dispatch({type:RESET_PATHERROR});
    }
    if (getState().appState.actionError) {
      dispatch({type: RESET_ACTIONERROR});
    }
  }, 500);
};
