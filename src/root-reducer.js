import { combineReducers } from "redux";

import MazeReducer from "./features/maze/maze.reducer";
import LeaderBoardReducer from "./features/leaderboard/leader-board.reducer";
import AuthReducer from "./features/auth/auth.reducer";

export const rootReducer = combineReducers({
        MazeReducer,
        LeaderBoardReducer,
        AuthReducer,
    }
);