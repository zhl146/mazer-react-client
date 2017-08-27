import { rootEpic, rootReducer } from "./reducers/root-reducer";
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware} from 'redux-observable';

const epicMiddleware = createEpicMiddleware(rootEpic);

export default function configureStore() {
  return createStore(
      rootReducer
  );
}