import { connect } from 'react-redux';

import { mazeAction, mazeCreate, toggleHelp, updateBoardViewParams } from './maze.action';
import { MazeComponent } from './maze.component';

const mapStateToProps = (state) => {
  return {
    maze: state.MazeReducer.maze,
    score: state.MazeReducer.maze.score,
    path: state.MazeReducer.path,
    rotateMaze: state.MazeReducer.rotateMaze,
    tileSize: state.MazeReducer.tileSize,
    helpDisplay: state.MazeReducer.helpDisplay,
    user: state.AuthReducer.user,
    token: state.AuthReducer.token
  };
};

const mapDispatchToProps  = dispatch => {
  return {
    updateBoardViewParams: (maze, params) => {
      dispatch(updateBoardViewParams(maze, params));
    },
    clickHandlers: {
      onMazeClick: (maze, tile) => {
        dispatch(mazeAction(maze, tile));
      },
      onResetClick: seed => {
        dispatch(mazeCreate(seed));
      },
      onHelpClick: () => {
        dispatch(toggleHelp());
      },
    }
  };
};

const MazeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MazeComponent);

export default MazeContainer;