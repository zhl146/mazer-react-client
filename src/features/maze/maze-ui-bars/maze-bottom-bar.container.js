import { connect } from 'react-redux';

import { MazeBottomBar } from "./maze-bottom-bar.component";
import { resetMaze, toggleHelp } from "../maze.action";

const mapStateToProps = state => ({
  maze: state.appState.maze,
  user: state.appState.user,
  token: state.appState.token,
  displayHelp: state.view.displayHelp
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
