import { combineReducers } from "redux";

import MazeReducer from "./Maze.reducer";
import LeaderBoardReducer from "./LeaderBoard.reducer";

export const rootReducer = combineReducers({
        MazeReducer,
        LeaderBoardReducer
    }
);