import { TOGGLE_HELP } from "../action-constants";

export const initialState = {
  displayHelp: false
};

const toggleHelp = state => ({ ...state, displayHelp: !state.displayHelp });

export default function viewReducer(state = initialState, action) {
  switch(action.type) {
    case TOGGLE_HELP: return toggleHelp(state);
    default: return state;
  }
}
