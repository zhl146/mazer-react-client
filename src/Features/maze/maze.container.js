import { connect } from 'react-redux';

import { initializeMaze, updateView } from './maze.action';
import { MazeComponent } from './maze.component';

const mapStateToProps = state => {
  return {
    maze: state.MazeReducer.maze,
    path: state.MazeReducer.path,
    rotateMaze: state.MazeReducer.rotateMaze,
    tileSize: state.MazeReducer.tileSize
  };
};

const mapDispatchToProps  = dispatch => {
  return {
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
