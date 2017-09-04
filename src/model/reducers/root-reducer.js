import { combineReducers } from "redux";

import MazeReducer from "./Maze.reducer";
import LeaderBoardReducer from "./LeaderBoard.reducer";
import ViewReducer from "./View.reducer";
import AuthReducer from "./Auth.reducer";

export const rootReducer = combineReducers({
        MazeReducer,
        LeaderBoardReducer,
        ViewReducer,
        AuthReducer,
    }
);