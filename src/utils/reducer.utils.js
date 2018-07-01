const isValidAction = reducerMap => action =>
  reducerMap.hasOwnProperty(action.type)

export const createReducer = (initialState, handlers) => (
  state = initialState,
  action
) => (isValidAction(handlers)(action) ? handlers[action.type] : state)
