import { TOGGLE_HELP, TOGGLE_SUBMIT } from '../action-constants'

export const initialState = {
  displayHelp: false,
  displaySubmit: false,
}
const toggleSubmit = state => ({
  ...state,
  displaySubmit: !state.displaySubmit,
})
const toggleHelp = state => ({ ...state, displayHelp: !state.displayHelp })

export default function viewReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_HELP:
      return toggleHelp(state)
    case TOGGLE_SUBMIT:
      return toggleSubmit(state)
    default:
      return state
  }
}
