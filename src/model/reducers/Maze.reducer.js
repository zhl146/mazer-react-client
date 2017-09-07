import shared from 'mazer-shared';
import { getUrlParameter, generateDateSeed } from '../../Utils/RequestUtils';
import { MAZE_ACTION, MAZE_CREATE, MAZE_ERROR, MAZE_RESET } from "../actions/Maze.action";

function calculateInitialState(seed=null){
    if(!seed){
        seed = getUrlParameter("seed");
        seed = (seed? seed: generateDateSeed());
    }
    console.log("Seed is: "+seed);
    let maze = shared.Maze(seed);
    console.log("maze seed is: "+maze.seed);
    return {
        seed,
        maze,
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