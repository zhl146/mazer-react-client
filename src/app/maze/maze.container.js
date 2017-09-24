import { connect } from 'react-redux';

import { fetchHighScore, initializeMaze, updateView } from './maze.action';
import { MazeComponent } from './maze.component';

const mapStateToProps = ({ mazeState, leaderboard }) => {
  return {
    maze: mazeState.maze,
    path: mazeState.path,
    highScore: leaderboard.highScore,
    rotateMaze: mazeState.rotateMaze,
    tileSize: mazeState.tileSize,
    pathError: mazeState.pathError,
    actionError: mazeState.actionError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchHighScore: seed => {
      dispatch(fetchHighScore(seed));
    },
    updateViewPort: params => {
      dispatch(updateView(params));
    },
    initializeMaze: seed => {
      dispatch(initializeMaze(seed));
    }
  };
};

export const ConnectedMaze = connect(
    mapStateToProps,
    mapDispatchToProps
)(MazeComponent);
