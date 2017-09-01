import _ from 'lodash';

export const MAZE_CREATE = 'MAZE_CREATE';
export const MAZE_ACTION = 'MAZE_ACTION';
export const MAZE_UNDO = 'MAZE_UNDO';
export const MAZE_RESET = 'MAZE_RESET';
export const MAZE_ERROR = 'MAZE_RESET';

export function mazeCreate(seed){
    return { type: MAZE_CREATE, seed: seed }
}

export function mazeAction(maze, tile){
    let newMaze = _.cloneDeep(maze);
    newMaze.doActionOnTile(tile);
    newMaze.updatePath();
    newMaze.updateScore();
    try {
        return {
            type: MAZE_ACTION,
            payload: {
                maze: newMaze
            }
        }
    }
    catch(ex){
        console.log("error, you probably blocked the maze: ");
        console.log(ex);
        return {
            type: MAZE_ERROR,
            payload: {
                pathError: true
            }
        }
    }
}

export function mazeUndo() {
    return { type: MAZE_UNDO }
}

export function mazeReset() {
    return { type: MAZE_RESET }
}
