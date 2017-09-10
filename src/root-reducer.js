import { combineReducers } from "redux";

import MazeReducer from "./Features/Maze/Maze.reducer";
import LeaderBoardReducer from "./Features/Leaderboard/LeaderBoard.reducer";
import AuthReducer from "./Features/Auth/Auth.reducer";

export const rootReducer = combineReducers({
        MazeReducer,
        LeaderBoardReducer,
        AuthReducer,
    }
);