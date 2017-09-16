import { RESET_ACTIONERROR, RESET_PATHERROR } from "../maze.action";

export const CLICK_TILE = 'CLICK_TILE';

export const doAction = tile => ({type: CLICK_TILE, tile});

export const clickTile = tile => (dispatch, getState) => {
  dispatch(doAction(tile));
  setTimeout(() => {
    if (getState().MazeReducer.pathError) {
      dispatch({type:RESET_PATHERROR});
    }
    if (getState().MazeReducer.actionError) {
      dispatch({type: RESET_ACTIONERROR});
    }
  }, 500);
};
