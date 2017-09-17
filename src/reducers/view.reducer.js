import { TOGGLE_HELP } from "../features/maze/maze.action";

export const initialState = {
  displayHelp: false
};

export default function viewReducer(state = initialState, action) {
  switch(action.type) {
    case TOGGLE_HELP:
      return ({
        ...state,
        displayHelp: !state.displayHelp
      });
    default:
      return state;
  }
}