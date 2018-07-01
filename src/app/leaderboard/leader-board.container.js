import { fetchLeaderBoard } from './leader-board.action'
import { connect } from 'react-redux'
import { LeaderBoardComponent } from './leader-board.component'
import { initializeMaze } from '../maze/maze.action'

const mapStateToProps = ({ mazeState, leaderboard }) => {
  return {
    seed: mazeState.maze ? mazeState.maze.seed : null,
    topTen: leaderboard.topTen,
    playerRank: null,
    pending: leaderboard.leaderBoardPending,
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
