const actionLoggingMiddleware = store => next => action => {
  console.log('Action fired :', action)
  next(action)
}

export default actionLoggingMiddleware
