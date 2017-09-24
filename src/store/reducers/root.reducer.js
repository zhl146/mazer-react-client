import { combineReducers } from "redux";

import leaderboard from './leaderboard.reducer';
import mazeState from './maze-state.reducer';
import view from './view.reducer';
import auth from './auth.reducer';

export const rootReducer = combineReducers({
  auth,
  leaderboard,
  mazeState,
  view,
});