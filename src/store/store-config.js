import { rootReducer } from "./reducers/root.reducer";
import { applyMiddleware, createStore } from 'redux';

import thunk from './middleware/thunk.middleware';

export default function configureStore() {
  return createStore(
      rootReducer,
      applyMiddleware(thunk)
  );
}