import {
  ACTION_ERROR,
  ACTION_START,
  ACTION_SUCCESS,
} from 'utils/action-creator'
import {
  FETCH_HIGHSCORE,
  FETCH_LEADERBOARD,
  FETCH_CLOSEST_SCORES,
} from '../action-constants'

export const initialState = {
  highScore: null,
  topScores: [],
  closestScores: [],
  leaderBoardPending: false,
  leaderBoardError: false,
}

const fetchHighScore = (state, { meta, payload }) => {
  switch (meta) {
    case ACTION_SUCCESS:
      return { ...state, highScore: payload }
    case ACTION_ERROR:
      return { ...state, leaderBoardError: payload }
    default:
      return state
  }
}

const fetchLeaderboard = (state, { meta, payload }) => {
  switch (meta) {
    case ACTION_START:
      return { ...state, leaderBoardPending: true }
    case ACTION_SUCCESS:
      return {
        ...state,
        topScores: payload,
        leaderBoardPending: false,
      }
    case ACTION_ERROR:
      return { ...state, leaderBoardPending: false, leaderBoardError: payload }
    default:
      return state
  }
}

const fetchClosestScores = (state, { meta, payload }) => {
  switch (meta) {
    case ACTION_START:
      return { ...state, leaderBoardPending: true }
    case ACTION_SUCCESS:
      return {
        ...state,
        closestScores: payload,
        leaderBoardPending: false,
      }
    case ACTION_ERROR:
      return { ...state, leaderBoardPending: false, leaderBoardError: payload }
    default:
      return state
  }
}

export default function domainReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_HIGHSCORE:
      return fetchHighScore(state, action)
    case FETCH_LEADERBOARD:
      return fetchLeaderboard(state, action)
    case FETCH_CLOSEST_SCORES:
      return fetchClosestScores(state, action)
    default:
      return state
  }
}
