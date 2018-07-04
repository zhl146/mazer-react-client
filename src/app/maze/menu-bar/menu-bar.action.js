import {
  createErrorAction,
  createStaticAction,
  createUpdateAction,
} from '../../../utils/action-creator'
import {
  AUTH_ERROR,
  RESET_MAZE,
  SET_PROFILE,
  TOGGLE_HELP,
  TOGGLE_LEADERBOARD,
  TOGGLE_SUBMIT,
} from 'store/action-constants'
import MyFireBase, { googleAuthProvider } from '../../../utils/auth.utils'

export const authError = error => createErrorAction(AUTH_ERROR, error)
export const setAuthProfile = (token, user) =>
  createUpdateAction(SET_PROFILE, { token, user })
export const resetMaze = payload => createUpdateAction(RESET_MAZE, payload)
export const toggleHelp = () => createStaticAction(TOGGLE_HELP)
export const toggleLeaderboard = () => createStaticAction(TOGGLE_LEADERBOARD)
export const toggleSubmit = () => createStaticAction(TOGGLE_SUBMIT)

export const firebaseLogin = () => async dispatch => {
  try {
    const response = await MyFireBase.auth().signInWithPopup(googleAuthProvider)
    window.localStorage.setItem("mazerCachedToken", JSON.stringify(response.credential))
    dispatch(setAuthProfile(response.credential))
  } catch (ex) {
    dispatch(authError(ex))
  }
}

export const firebaseLogout = () => async dispatch => {
  try {
    await MyFireBase.auth().signOut()
    window.localStorage.removeItem("mazerCachedToken")
    dispatch(setAuthProfile(null))
  } catch (ex) {
    dispatch(authError(ex))
  }
}
