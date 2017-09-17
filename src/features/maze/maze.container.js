import { connect } from 'react-redux';

import { fetchHighScore, initializeMaze, updateView } from './maze.action';
import { MazeComponent } from './maze.component';

const mapStateToProps = state => {
  return {
    maze: state.appState.maze,
    path: state.appState.path,
    highScore: state.domain.highScore,
    rotateMaze: state.appState.rotateMaze,
    tileSize: state.appState.tileSize,
    pathError: state.appState.pathError,
    actionError: state.appState.actionError
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
