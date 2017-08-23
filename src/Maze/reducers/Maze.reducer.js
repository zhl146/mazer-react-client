import {MAZE_ACTION, MAZE_CREATE} from "../actions/Maze.action";
import _ from 'lodash';
import shared from 'mazer-shared';
import { getUrlParameter, generateDateSeed } from '../../Utils/RequestUtils';

function calculateInitialState(seed=null){
    if(!seed){
        seed = getUrlParameter("seed");
        seed = (seed? seed: generateDateSeed());
    }
    let maze = shared.Maze(seed);
    let ScoreMgr = shared.Score(maze);

    return {
        seed: seed,
        maze: maze,
        ScoreMgr: ScoreMgr,
        score: 0
    }
}

function updateMazeState(maze, tile, ScoreMgr){
    let newMaze = _.cloneDeep(maze);
    newMaze.doActionOnTile(tile);
    let score = ScoreMgr.calculateScore(newMaze);
    return {
        maze: newMaze,
        score: score
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
        break;
        case MAZE_ACTION:
            return Object.assign(
                {}, 
                state, 
                updateMazeState(
                    state.maze, 
                    action.tile, 
                    state.ScoreMgr
                )
            );
        break;
        default:
            return state;
    }
}

export default MazeReducer;