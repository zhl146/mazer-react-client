import { combineReducers } from "redux";

import MazeReducer from "./Features/maze/maze.reducer";
import LeaderBoardReducer from "./Features/leaderboard/leader-board.reducer";
import AuthReducer from "./Features/auth/auth.reducer";

export const rootReducer = combineReducers({
        MazeReducer,
        LeaderBoardReducer,
        AuthReducer,
    }
);