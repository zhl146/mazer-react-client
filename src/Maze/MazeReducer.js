import {MAZE_ACTION, MAZE_CREATE, MAZE_RESET, MAZE_UNDO} from "./MazeActions";
import mazeShared from 'mazer-shared';
import _ from 'lodash';

const initialState = {
    seed: null,
    maze: null
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