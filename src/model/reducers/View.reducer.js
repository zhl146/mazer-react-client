import { TOGGLE_HELP } from "../actions/View.action";

const initialState = {
  helpDisplay: false,
};

const ViewReducer = (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_HELP:
      return Object.assign({}, state, {helpDisplay: !state.helpDisplay})
    default:
      return state;
  }
};


export default ViewReducer