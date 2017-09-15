import {
  FETCH_LEADERBOARD,
  FETCH_LEADERBOARD_FULFILLED,
  FETCH_LEADERBOARD_ERROR,
  INIT_LEADERBOARD
} from "./leader-board.action";

export const initialState = {
  seed: null,
  scores: [],
  pending: true,
  error: null
};

function LeaderBoardReducer(state = initialState, action){
  switch ( action.type ) {
    case FETCH_LEADERBOARD:
      return Object.assign(
          {},
          state,
          {
            leaderBoardPending: true
          }
      );
    case FETCH_LEADERBOARD_FULFILLED:
      return Object.assign(
          {},
          state,
          {
            scores: action.scores,
            leaderBoardPending: false,
            seed: action.seed
          }
      );
    case FETCH_LEADERBOARD_ERROR:
      return Object.assign(
          {},
          state,
          {
            scores: [],
            leaderBoardPending: false,
            error: action.error
          }
      );
    default:
      return state;
  }
}

export default LeaderBoardReducer;


