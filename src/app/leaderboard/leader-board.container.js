import * as R from 'ramda'

import { fetchLeaderBoard } from './leader-board.action'
import { connect } from 'react-redux'
import { LeaderBoardComponent } from './leader-board.component'
import { initializeMaze } from '../maze/maze.action'

const mapStateToProps = ({ mazeState, leaderboard, auth }) => {
  console.log(auth)
  return {
    seed: R.pathOr(null, ['maze', 'seed'], mazeState),
    scores: leaderboard.scores,
    pending: leaderboard.leaderBoardPending,
    token: R.path(['token', 'idToken'], auth),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initializeMaze: seed => {
      dispatch(initializeMaze(seed))
    },
    fetchLeaderBoard: seed => {
      dispatch(fetchLeaderBoard(seed))
    },
  }
}

export const ConnectedLeaderBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaderBoardComponent)
