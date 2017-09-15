import { connect } from 'react-redux';

import { MazeBottomBar } from "./maze-bottom-bar.component";
import { mazeCreate, toggleHelp } from "../maze.action";

const mapStateToProps = state => ({
  maze: state.MazeReducer.maze,
  user: state.AuthReducer.user,
  token: state.AuthReducer.token,
  displayHelp: state.MazeReducer.displayHelp
});

const mapDispatchToProps = dispatch => ({
  onResetClick: seed => {
    dispatch(mazeCreate(seed));
  },
  onHelpClick: () => {
    dispatch(toggleHelp);
  }
});

export const MazeBottomBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MazeBottomBar);
