import { AUTH_ERROR, SET_PROFILE } from '../action-constants'

const getCachedToken = () => {
  try {
    const stringToken = window.localStorage.getItem("mazerCachedToken")
      return stringToken && JSON.parse(stringToken)
  }
  catch(error) {
    console.log(error)
    window.localStorage.removeItem("mazerCachedToken")
    return null
  }
}

export const initialState = {
  token: getCachedToken(),
  authError: null,
}

const setProfile = (state, { payload: { token } }) => ({
  ...state,
  token,
})
const authError = (state, { payload }) => ({ ...state, authError: payload })

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROFILE:
      return setProfile(state, action)
    case AUTH_ERROR:
      return authError(state, action)
    default:
      return state
  }
}
