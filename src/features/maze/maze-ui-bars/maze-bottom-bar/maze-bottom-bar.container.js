import { connect } from 'react-redux';
import { MazeBottomBar } from "./maze-bottom-bar.component";
import { resetMaze, toggleHelp, submitScore, firebaseLogin } from "./maze-bottom-bar.action";
import { withRouter } from 'react-router-dom';

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
  },
  onSubmitScoreClick: (history) => {
    dispatch(submitScore(maze, history, user, token));
  },
  onLoginClick: () => {
    dispatch(firebaseLogin());
  }
});

export const ConnectedMazeBottomBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(MazeBottomBar));
