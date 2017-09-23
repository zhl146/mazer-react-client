import { connect } from 'react-redux';

import { fetchHighScore, initializeMaze, updateView } from './maze.action';
import { MazeComponent } from './maze.component';

const mapStateToProps = ({ state, data }) => {
  return {
    maze: state.maze,
    path: state.path,
    highScore: data.highScore,
    rotateMaze: state.rotateMaze,
    tileSize: state.tileSize,
    pathError: state.pathError,
    actionError: state.actionError
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
