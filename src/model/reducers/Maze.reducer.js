import _ from 'lodash';

import shared from 'mazer-shared';
import { getUrlParameter, generateDateSeed } from '../../Utils/RequestUtils';
import {MAZE_ACTION, MAZE_CREATE, MAZE_ERROR} from "../actions/Maze.action";

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
        score: 0,
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
        default:
            return state;
    }
}

export default MazeReducer;