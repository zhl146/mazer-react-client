import { createUpdateAction } from "../../../Utils/action-creator";

export const UPDATE_MAZE = 'UPDATE_MAZE';

export const doAction = tile => createUpdateAction(UPDATE_MAZE, tile);

export const clickTile = tile => (dispatch, getState) => {
  dispatch(doAction(tile));
};
