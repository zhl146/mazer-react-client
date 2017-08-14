import getUrlParameter from '../Utils/RequestUtils';

export const MAZE_CREATE = 'MAZE_CREATE';
export const MAZE_ACTION = 'MAZE_ACTION';
export const MAZE_UNDO = 'MAZE_UNDO';
export const MAZE_RESET = 'MAZE_RESET';

export function mazeCreate(seed){
    return { type: MAZE_CREATE, seed: seed }
}

export function mazeAction(tile){
    return { type: MAZE_ACTION, tile: tile }
}

export function mazeUndo() {
    return { type: MAZE_UNDO }
}

export function mazeReset() {
    return { type: MAZE_RESET }
}
