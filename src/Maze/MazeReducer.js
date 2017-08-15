import {MAZE_ACTION, MAZE_CREATE} from "./MazeActions";
import {mazeShared} from 'mazer-shared';
import _ from 'lodash';
import shared from 'mazer-shared';
import { getUrlParameter, generateDateSeed } from '../Utils/RequestUtils';

let seed = getUrlParameter("seed");
seed = (seed? seed: generateDateSeed());
let maze = shared.Maze(seed);
const initialState = {
    seed: seed,
    maze: maze
};

function MazeReducer(state = initialState, action){
    switch ( action.type ) {
        case MAZE_CREATE:
            let seed = action.seed;
            let generatedMaze = mazeShared.Maze(seed);
            return {
                seed,
                maze: generatedMaze
            };
        case MAZE_ACTION:
            let newMaze = _.cloneDeep(state.maze);
            newMaze.doActionOnTile(action.tile);
            return Object.assign({}, state, {
               maze: newMaze
            });
        default:
            return state;
    }
}

export default MazeReducer;