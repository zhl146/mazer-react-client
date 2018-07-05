import * as R from 'ramda'

import {
  fetchLeaderBoard,
  fetchClosestScores,
  toggleLeaderboard,
  showSolution,
} from './leader-board.action'
import { connect } from 'react-redux'
import { LeaderBoardComponent } from './leader-board.component'
import { initializeMaze } from '../maze/maze.action'

const mapStateToProps = ({ mazeState, leaderboard, auth }) => {
  const { topScores, closestScores } = leaderboard

  const myScore = closestScores.find(score => score.myScore)
  const myRank = R.prop('rank', myScore)

  return {
    seed: R.pathOr(null, ['maze', 'seed'], mazeState),
    topScores: leaderboard.topScores,
    closestScores: closestScores,
    pending: leaderboard.leaderBoardPending,
    token: R.path(['token', 'idToken'], auth),
    myRank,
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
    fetchClosestScores: (seed, userId) => {
      dispatch(fetchClosestScores(seed, userId))
    },
    toggleLeaderboard: () => {
      dispatch(toggleLeaderboard())
    },
    showSolution: (seed, solution) => {
      dispatch(showSolution(seed, solution))
    },
  }
}

export const ConnectedLeaderBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaderBoardComponent)
