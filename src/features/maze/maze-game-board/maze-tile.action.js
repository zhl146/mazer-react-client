import { createUpdateAction } from "../../../utils/action-creator";
import { UPDATE_MAZE } from "../../../store/action-constants";

export const doAction = tile => createUpdateAction(UPDATE_MAZE, tile);

export const clickTile = tile => (dispatch, getState) => {
  dispatch(doAction(tile));
};
