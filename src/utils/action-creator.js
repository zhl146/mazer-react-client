const createAction = (type, meta, payload, error) => {
  return {
    type,
    meta,
    payload,
    error,
  }
}

export const createStartAction = type =>
  createAction(type, ACTION_START, null, null)
export const createSuccessAction = (type, payload) =>
  createAction(type, ACTION_SUCCESS, payload, null)
export const createErrorAction = (type, error) =>
  createAction(type, ACTION_ERROR, error, true)
export const createStaticAction = type =>
  createAction(type, ACTION_STATIC, null, null)
export const createUpdateAction = (type, payload) =>
  createAction(type, ACTION_UPDATE, payload, null)

export const ACTION_START = 'ACTION_START'
export const ACTION_SUCCESS = 'ACTION_SUCCESS'
export const ACTION_ERROR = 'ACTION_ERROR'
export const ACTION_STATIC = 'ACTION_STATIC'
export const ACTION_UPDATE = 'ACTION_UPDATE'
