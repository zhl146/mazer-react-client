import { connect } from 'react-redux'

import { MenuBar } from './menu-bar.component'
import {
  resetMaze,
  toggleHelp,
  toggleSubmit,
  firebaseLogin,
  firebaseLogout,
} from './menu-bar.action'

const mapStateToProps = ({ auth, mazeState, view }) => ({
  maze: mazeState.maze,
  token: auth.token,
  displayHelp: view.displayHelp,
})

const mapDispatchToProps = (dispatch, props) => ({
  onResetClick: (seed) => {
    dispatch(
      resetMaze({ seed: seed, width: window.innerWidth, height: window.innerHeight })
    )
  },
  toggleHelp: () => {
    dispatch(toggleHelp())
  },
  toggleSubmit: () => {
    dispatch(toggleSubmit())
  },
  onLogoutClick: () => {
    dispatch(firebaseLogout())
  },
  onLoginClick: () => {
    dispatch(firebaseLogin())
  },
})

export const ConnectedMenuBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBar)
