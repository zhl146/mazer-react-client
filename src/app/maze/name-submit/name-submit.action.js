import axios from 'axios'

import { solutionUrl } from '../../../server/url-generator'

export const submitScore = (name, history) => async (dispatch, getState) => {
  let { mazeState, auth } = getState()

  let payload = {
    seed: mazeState.maze.seed,
    solution: mazeState.maze.getUserChanges(),
    email: auth.user.email,
    name,
  }
  try {
    let response = await axios.post(solutionUrl, payload)
    history.push('/leaderboard?seed=' + mazeState.maze.seed)
  } catch (e) {
    console.log(e)
  }
}
