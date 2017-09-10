import _ from 'lodash';

export const MAZE_CREATE = 'MAZE_CREATE';
export const MAZE_ACTION = 'MAZE_ACTION';
export const MAZE_UNDO = 'MAZE_UNDO';
export const MAZE_RESET = 'MAZE_RESET';
export const MAZE_ERROR = 'MAZE_RESET';

export const TOGGLE_HELP = 'TOGGLE_HELP';
export const UPDATE_BOARDVIEWPARAMS = 'UPDATE_BOARDVIEWPARAMS';

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

export const toggleHelp = () => ({ type: TOGGLE_HELP });

export const updateBoardViewParams = (maze, windowParams) => {

  const headerHeight = 60;
  const footerHeight = 60;

  let rotateMaze = false;

  let numRows = maze.params.numRows;
  let numColumns = maze.params.numColumns;

  const availableHeight = windowParams.height - headerHeight - footerHeight;
  const availableWidth = windowParams.width;

  // check dimensionality of client window
  const windowOrientation = availableWidth > availableHeight ? 'landscape' : 'portrait';

  // check orientation of generated maze
  let mazeOrientation = numColumns > numRows ? 'landscape' : 'portrait';


  // if the generated maze doesn't match up with the window, rotate the maze
  if (windowOrientation !== mazeOrientation) {
    numRows = maze.params.numColumns;
    numColumns = maze.params.numRows;
    rotateMaze = true;
  }

  // calculate the maximum allowable dimensions for each tile
  const maxTileHeight = availableHeight / numRows;
  const maxTileWidth = availableWidth / numColumns;

  // choose the limiting dimensions to make the tiles square and also fit the screen
  let tileSize = maxTileHeight > maxTileWidth ? maxTileWidth : maxTileHeight;

  // we limit the tile dimension to 30px so we default to 30 if the calculated dimension is too large
  tileSize = tileSize > 30 ? 30 : tileSize;

  return {
    type: UPDATE_BOARDVIEWPARAMS,
    payload: {
      tileSize: tileSize,
      rotateMaze: rotateMaze,
    },
  }
};