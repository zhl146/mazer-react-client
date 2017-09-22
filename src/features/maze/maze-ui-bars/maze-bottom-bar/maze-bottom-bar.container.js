import { connect } from 'react-redux';

import { MazeBottomBar } from "./maze-bottom-bar.component";
import { resetMaze, toggleHelp } from "./maze-bottom-bar.action";

const mapStateToProps = ({ state, view }) => ({
  maze: state.maze,
  user: state.user,
  token: state.token,
  displayHelp: view.displayHelp
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
