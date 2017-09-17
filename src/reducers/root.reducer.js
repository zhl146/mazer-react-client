import { combineReducers } from "redux";

import domain from './domain.reducer';
import appState from './app-state.reducer';
import view from './view.reducer';

export const rootReducer = combineReducers({
  domain,
  appState,
  view,
});