import axios from 'axios'

import {
  createErrorAction,
  createStartAction,
  createStaticAction,
  createSuccessAction,
  createUpdateAction,
} from '../../utils/action-creator'

import {
  FETCH_HIGHSCORE,
  INIT_MAZE,
  UNDO_ACTION,
  UPDATE_VIEWPARAMS,
} from '../../store/action-constants'

import { leaderboardUrl } from '../../server/url-generator'

export const undoAction = () => createStaticAction(UNDO_ACTION)
export const initializeMaze = seed => createUpdateAction(INIT_MAZE, seed)
export const updateView = viewParams =>
  createUpdateAction(UPDATE_VIEWPARAMS, viewParams)

export const fetchHighScore = seed => async dispatch => {
  dispatch(createStartAction(FETCH_HIGHSCORE))
  try {
    let {
      data: { scores },
    } = await axios.post(leaderboardUrl + '/scores', { seed })
    if (scores.length === 0) {
      dispatch(createSuccessAction(FETCH_HIGHSCORE, 0))
    } else {
      dispatch(createSuccessAction(FETCH_HIGHSCORE, scores[0].score))
    }
  } catch (e) {
    dispatch(createErrorAction(FETCH_HIGHSCORE, e))
  }
}
