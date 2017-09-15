import { connect } from 'react-redux';

import { MazeBottomBar } from "./maze-bottom-bar.component";
import { resetMaze, toggleHelp } from "../maze.action";

const mapStateToProps = state => ({
  maze: state.MazeReducer.maze,
  user: state.AuthReducer.user,
  token: state.AuthReducer.token,
  displayHelp: state.MazeReducer.displayHelp
});

const mapDispatchToProps = dispatch => ({
  onResetClick: () => {
    dispatch(resetMaze());
  },
  onHelpClick: () => {
    dispatch(toggleHelp());
  }
});

export const ConnectedMazeBottomBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(MazeBottomBar);