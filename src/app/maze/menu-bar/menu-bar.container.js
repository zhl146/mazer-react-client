import { connect } from 'react-redux';
import { MenuBar } from "./menu-bar.component";
import { resetMaze, toggleHelp, submitScore, firebaseLogin } from "./menu-bar.action";
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ auth, state, view }) => ({
  maze: state.maze,
  user: auth.user,
  token: auth.token,
  displayHelp: view.displayHelp
});

const mapDispatchToProps = (dispatch,props)  => ({

  onResetClick: () => {
    dispatch(resetMaze());
  },
  onHelpClick: () => {
    dispatch(toggleHelp());
  },
  onSubmitScoreClick: (history) => {
    dispatch(submitScore(history));
  },
  onLoginClick: () => {
    dispatch(firebaseLogin());
  }
});

export const ConnectedMenuBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(MenuBar));
