import { rootReducer } from "./root-reducer";
import { applyMiddleware, createStore } from 'redux';

import thunk from './middleware/thunk.middleware';
import actionLogger from './middleware/action-logger.middleware';

export default function configureStore() {
  return createStore(
      rootReducer,
      applyMiddleware(thunk, actionLogger)
  );
}