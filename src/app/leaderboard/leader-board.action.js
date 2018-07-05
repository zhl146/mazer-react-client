import {
  createStaticAction,
  createErrorAction,
  createStartAction,
  createSuccessAction,
  createUpdateAction,
} from '../../utils/action-creator'
import axios from 'axios'
import {
  TOGGLE_LEADERBOARD,
  FETCH_LEADERBOARD,
  FETCH_CLOSEST_SCORES,
  SHOW_SOLUTION,
} from 'store/action-constants'
import { leaderboardUrl } from 'server/url-generator'

export const toggleLeaderboard = () => createStaticAction(TOGGLE_LEADERBOARD)

export const fetchLeaderBoard = seed => async dispatch => {
  dispatch(createStartAction(FETCH_LEADERBOARD))
  try {
    const {
      data: { scores },
    } = await axios.post(leaderboardUrl + '/scores', { seed })
    dispatch(createSuccessAction(FETCH_LEADERBOARD, scores))
  } catch (e) {
    dispatch(createErrorAction(FETCH_LEADERBOARD, e))
  }
}

export const fetchClosestScores = (seed, userId) => async dispatch => {
  dispatch(createStartAction(FETCH_CLOSEST_SCORES))
  try {
    const {
      data: { scores },
    } = await axios.post(leaderboardUrl + '/range', {
      seed,
      userId: '100539363718454838066',
      range: 2,
    })
    dispatch(createSuccessAction(FETCH_CLOSEST_SCORES, scores))
  } catch (e) {
    dispatch(createErrorAction(FETCH_CLOSEST_SCORES, e))
  }
}

export const showSolution = (seed, solution) =>
  createUpdateAction(SHOW_SOLUTION, { seed, solution })
