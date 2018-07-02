import { connect } from 'react-redux'

import { fetchHighScore, initializeMaze, updateView } from './maze.action'
import { MazeComponent } from './maze.component'

const mapStateToProps = ({ mazeState, leaderboard }) => {
  return {
    maze: mazeState.maze,
    path: mazeState.path,
    highScore: leaderboard.highScore,
    rotateMaze: mazeState.rotateMaze,
    tileSize: mazeState.tileSize,
    pathError: mazeState.pathError,
    actionErrorTime: mazeState.actionErrorTime,
    pathErrorTime: mazeState.pathErrorTime,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchHighScore: seed => {
      dispatch(fetchHighScore(seed))
    },
    updateViewPort: () => {
      dispatch(
        updateView({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      )
    },
    initializeMaze: seed => {
      dispatch(initializeMaze(seed))
    },
  }
}

export const ConnectedMaze = connect(
  mapStateToProps,
  mapDispatchToProps
)(MazeComponent)
