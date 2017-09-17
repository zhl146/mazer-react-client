import { FETCH_HIGHSCORE } from "../features/maze/maze.action";
import { FETCH_LEADERBOARD } from "../features/leaderboard/leader-board.action";
import { ACTION_ERROR, ACTION_START, ACTION_SUCCESS } from "../Utils/action-creator";

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
        topTen: action.payload
      });
    case ACTION_ERROR:
      return ({
        ...state,
        leaderBoardError: action.payload
      });
    default:
      return state;
  }
}