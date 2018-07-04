import axios from 'axios'

import { TOGGLE_LEADERBOARD } from 'store/action-constants'
import { createStaticAction } from 'utils/action-creator'
import { solutionUrl } from 'server/url-generator'

export const toggleLeaderboard = () => createStaticAction(TOGGLE_LEADERBOARD)

export const submitScore = (name) => async (dispatch, getState) => {
  let { mazeState, auth } = getState()

  let payload = {
    seed: mazeState.maze.seed,
    solution: mazeState.maze.getUserChanges(),
    token: auth.token.idToken,
    name,
  }

  try {
    let response = await axios.post(solutionUrl, payload)
    console.log(response)
    dispatch(toggleLeaderboard())
  } catch (e) {
    console.log(e)
  }
}
