import shared from 'mazer-shared';
import { getUrlParameter, generateDateSeed } from '../../Utils/RequestUtils';
import { MAZE_ACTION, MAZE_CREATE, MAZE_ERROR, MAZE_RESET } from "../actions/Maze.action";

function calculateInitialState(seed=null){
    if(!seed){
        seed = getUrlParameter("seed");
        seed = (seed? seed: generateDateSeed());
    }
    let maze = shared.Maze(seed);
    let scoreMgr = shared.Score(maze);
    let path = maze.findPath();
    return {
        seed,
        maze,
        scoreMgr,
        score: 0,
        path,
        pathError: false
    }
}

const initialState = calculateInitialState();

function MazeReducer(state = initialState, action){
    switch ( action.type ) {
        case MAZE_CREATE:
            return Object.assign(
                {},
                state,
                calculateInitialState(state.seed)
            );
        case MAZE_ACTION:
            return Object.assign(
                {}, 
                state, 
                action.payload
            );
        case MAZE_ERROR:
            return Object.assign(
                {},
                state,
                action.payload
            );
      case MAZE_RESET:
            let newMaze = shared.Maze(action.seed);
            let initialPath = newMaze.findPath();
            return Object.assign(
                {},
                state,
                {
                    maze: newMaze,
                    path: initialPath,
                }
            );
        default:
            return state;
    }
}

export default MazeReducer;