import { rootReducer } from "./reducers/root-reducer";
import { createStore } from 'redux';

export default function configureStore() {
  return createStore(
      rootReducer
  );
}