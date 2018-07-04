import {
  TOGGLE_HELP,
  TOGGLE_SUBMIT,
  TOGGLE_LEADERBOARD,
} from '../action-constants'

export const initialState = {
  displayHelp: false,
  displaySubmit: false,
  displayLeaderboard: false,
}

const toggleSubmit = state => ({ ...state, displaySubmit: !state.displaySubmit, })
const toggleHelp = state => ({ ...state, displayHelp: !state.displayHelp })
const toggleLeaderboard = state => ({ ...state, displayLeaderboard: !state.displayLeaderboard })

export default function viewReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_HELP:
      return toggleHelp(state)
    case TOGGLE_SUBMIT:
      return toggleSubmit(state)
    case TOGGLE_LEADERBOARD:
      return toggleLeaderboard(state)
    default:
      return state
  }
}
