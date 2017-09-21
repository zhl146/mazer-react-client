import { ACTION_ERROR, ACTION_START, ACTION_SUCCESS } from "../../utils/action-creator";
import { FETCH_HIGHSCORE, FETCH_LEADERBOARD } from "../action-constants";

export const initialState = {
  highScore: null,
  topTen: null,
  closestThree: null,
  leaderBoardPending: false,
  leaderBoardError: false
};

const fetchHighScore = (state, { payload }) => ({...state, highScore: payload});

const fetchLeaderboard = (state, { meta, payload }) => {
  switch(meta) {
    case ACTION_START: return ({ ...state, leaderBoardPending: true });
    case ACTION_SUCCESS: return ({ ...state, topTen: payload, leaderBoardPending: false });
    case ACTION_ERROR: return ({ ...state, leaderBoardPending: false, leaderBoardError: payload });
    default: return state;
  }
};

export default function domainReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_HIGHSCORE: return fetchHighScore(state, action);
    case FETCH_LEADERBOARD: return fetchLeaderboard(state, action);
    default: return state;
  }
}