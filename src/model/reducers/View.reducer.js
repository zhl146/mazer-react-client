import { RESIZE_MAZEBOARD, TOGGLE_HELP } from "../actions/View.action";

const initialState = {
  dimensions: {
    xDimension: 500,
    yDimension: 500,
  },
  helpDisplay: false,
};

const ViewReducer = (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_HELP:
      return Object.assign({}, state, {helpDisplay: !state.helpDisplay});

    case RESIZE_MAZEBOARD:
      return Object.assign({}, state, {dimensions: action.dimensions });

    default:
      return state;
  }
};


export default ViewReducer