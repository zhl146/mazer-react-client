import { combineReducers } from "redux";

import MazeReducer from "./Maze/Maze/Maze.reducer";
import LeaderBoardReducer from "./Maze/Leaderboard/LeaderBoard.reducer";
import AuthReducer from "./Maze/Auth/Auth.reducer";

export const rootReducer = combineReducers({
        MazeReducer,
        LeaderBoardReducer,
        AuthReducer,
    }
);