import { ACTION_ERROR, ACTION_START, ACTION_SUCCESS } from "../../Utils/action-creator";
import { FETCH_HIGHSCORE, FETCH_LEADERBOARD } from "../action-constants";

export const initialState = {
  highScore: null,
  topTen: null,
  closestThree: null,
  leaderBoardPending: false,
  leaderBoardError: false
};

export default function domainReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_HIGHSCORE: return updateState({ highScore: action.payload }, state);
    case FETCH_LEADERBOARD: return fetchReducer(state, action);
    default: return state;
  }
}

function updateState(update, state) {
  return ({
    ...state,
    ...update
  });
}

function fetchReducer(state, action) {
  switch(action.meta) {
    case ACTION_START:
      return ({
        ...state,
        leaderBoardPending: true
      });
    case ACTION_SUCCESS:
      return ({
        ...state,
        topTen: action.payload,
        leaderBoardPending: false
      });
    case ACTION_ERROR:
      return ({
        ...state,
        leaderBoardPending: false,
        leaderBoardError: action.payload
      });
    default:
      return state;
  }
}