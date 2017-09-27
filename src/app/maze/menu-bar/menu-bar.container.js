import { connect } from 'react-redux';

import { MenuBar } from "./menu-bar.component";
import { resetMaze, toggleHelp, toggleSubmit, firebaseLogin } from "./menu-bar.action";

const mapStateToProps = ({ auth, mazeState, view }) => ({
  maze: mazeState.maze,
  user: auth.user,
  token: auth.token,
  displayHelp: view.displayHelp
});

const mapDispatchToProps = (dispatch,props)  => ({

  onResetClick: () => {
    dispatch(resetMaze());
  },
  toggleHelp: () => {
    dispatch(toggleHelp());
  },
  toggleSubmit: () => {
    dispatch(toggleSubmit());
  },
  onLoginClick: () => {
    dispatch(firebaseLogin());
  }
});

export const ConnectedMenuBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuBar);
