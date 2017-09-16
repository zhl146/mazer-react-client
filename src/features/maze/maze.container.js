import { connect } from 'react-redux';

import { fetchHighScore, initializeMaze, updateView } from './maze.action';
import { MazeComponent } from './maze.component';

const mapStateToProps = state => {
  return {
    maze: state.MazeReducer.maze,
    path: state.MazeReducer.path,
    highScore: state.MazeReducer.highScore,
    rotateMaze: state.MazeReducer.rotateMaze,
    tileSize: state.MazeReducer.tileSize,
    pathError: state.MazeReducer.pathError,
    actionError: state.MazeReducer.actionError
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
