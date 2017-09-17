import { combineReducers } from "redux";

import data from './data.reducer';
import state from './state.reducer';
import view from './view.reducer';
import auth from './auth.reducer';

export const rootReducer = combineReducers({
  auth,
  data,
  state,
  view,
});