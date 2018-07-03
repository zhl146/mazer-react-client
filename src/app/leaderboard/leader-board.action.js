import {
  createErrorAction,
  createStartAction,
  createSuccessAction,
} from '../../utils/action-creator'
import axios from 'axios'
import { FETCH_LEADERBOARD } from 'store/action-constants'
import { leaderboardUrl } from 'server/url-generator'

export const fetchLeaderBoard = (seed, token) => async dispatch => {
  dispatch(createStartAction(FETCH_LEADERBOARD))
  try {
    console.log(seed, token)
    const {
      data: { scores },
    } = await axios.post(leaderboardUrl + '/scores', { seed })
    dispatch(createSuccessAction(FETCH_LEADERBOARD, scores))
  } catch (e) {
    dispatch(createErrorAction(FETCH_LEADERBOARD, e))
  }
}
