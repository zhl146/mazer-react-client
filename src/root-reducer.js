import { combineReducers } from "redux";

import MazeReducer from "./Maze/Maze/Maze.reducer";
import LeaderBoardReducer from "./Maze/Leaderboard/LeaderBoard.reducer";
import ViewReducer from "./Maze/View.reducer";
import AuthReducer from "./Maze/Auth/Auth.reducer";

export const rootReducer = combineReducers({
        MazeReducer,
        LeaderBoardReducer,
        ViewReducer,
        AuthReducer,
    }
);