import { connect } from 'react-redux';

import { initializeMaze, updateBoardViewParams } from './maze.action';
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
    updateBoardViewParams: (maze, params) => {
      dispatch(updateBoardViewParams(maze, params));
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
