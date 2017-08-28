import _ from 'lodash';

import shared from 'mazer-shared';
import { getUrlParameter, generateDateSeed } from '../../Utils/RequestUtils';
import {MAZE_ACTION, MAZE_CREATE} from "../actions/Maze.action";

function calculateInitialState(seed=null){
    if(!seed){
        seed = getUrlParameter("seed");
        seed = (seed? seed: generateDateSeed());
    }
    let maze = shared.Maze(seed);
    let ScoreMgr = shared.Score(maze);
    console.log("seed: "+seed);
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
        default:
            return state;
    }
}

export default MazeReducer;