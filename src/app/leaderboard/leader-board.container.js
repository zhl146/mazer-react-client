import * as R from 'ramda'

import { fetchLeaderBoard, fetchClosestScores, toggleLeaderboard } from './leader-board.action'
import { connect } from 'react-redux'
import { LeaderBoardComponent } from './leader-board.component'
import { initializeMaze } from '../maze/maze.action'

const mapStateToProps = ({ mazeState, leaderboard, auth }) => {
  const { topScores, closestScores } = leaderboard

  const topRanks = topScores.map(score => score.rank)
  const playerScore = closestScores.find(score => score.myScore)

  console.log(playerScore)

  return {
    seed: R.pathOr(null, ['maze', 'seed'], mazeState),
    topScores: leaderboard.topScores,
    closestScores: closestScores,
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
    fetchClosestScores: seed => {
      dispatch(fetchClosestScores(seed))
    },
    toggleLeaderboard: () => {
      dispatch(toggleLeaderboard())
    },
  }
}

export const ConnectedLeaderBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaderBoardComponent)
