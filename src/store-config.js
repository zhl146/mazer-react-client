import { rootReducer } from "./root-reducer";
import { createStore } from 'redux';

export default function configureStore() {
  return createStore(
      rootReducer
  );
}