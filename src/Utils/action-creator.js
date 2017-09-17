const createGenericAction = (type, meta, payload, error) => {
  return ({
    type,
    payload,
    meta,
    error
  });
};

const curry = (f, n) => {
  let args = Array.from(arguments);
  if (!n) args[1] = f.length;
  if (n === args.length - 2)
    return f.apply(undefined, args.slice(2));
  return function() {
    return curry.call(undefined, ...args, ...arguments);
  };
};

export const createAction = curry(createGenericAction);
export const createStartAction = type => createAction(type, ACTION_START, null, null);
export const createSuccessAction = (type, payload) => (
    createAction(type, ACTION_SUCCESS, payload, null)
);
export const createErrorAction = (type, error) => (
    createAction(type, ACTION_ERROR, error, true)
);

export const ACTION_START = 'ACTION_START';
export const ACTION_SUCCESS = 'ACTION_SUCCESS';
export const ACTION_ERROR = 'ACTION_ERROR';