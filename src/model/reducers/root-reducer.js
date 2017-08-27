import { combineReducers } from "redux";
import { combineEpics } from 'redux-observable';

import MazeReducer from "./Maze.reducer";
import LeaderBoardReducer from "./LeaderBoard.reducer";
import { fetchLeaderBoardEpic } from "../actions/LeaderBoard.action";


export const rootReducer = combineReducers({
      MazeReducer,
      LeaderBoardReducer
    }
);

export const rootEpic = fetchLeaderBoardEpic;