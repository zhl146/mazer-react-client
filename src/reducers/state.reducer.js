import { createMaze } from 'mazer-shared';
import { cloneDeep } from 'lodash';

import {
  INIT_MAZE,
  RESET_PATHERROR,
  RESET_MAZE,
  UPDATE_VIEWPARAMS,
  RESET_ACTIONERROR,
} from "../features/maze/maze.action";

import { UPDATE_MAZE } from "../features/maze/maze-game-board/maze-tile.action";

export const initialState = {
  maze: null,
  path: null,
  rotateMaze: false,
  tileSize: 30,
  pathError: false,
  actionError: false,
};

export default function appStateReducer(state = initialState, action){
  switch ( action.type ) {
    case UPDATE_MAZE:
      let newMaze = cloneDeep(state.maze);
      let code = newMaze.doActionOnTile(action.payload);
      return ({
        ...state,
        maze: newMaze,
        path: calculatePath(
            newMaze.path,
            state.tileSize,
            state.rotateMaze
        ),
        pathError: code === newMaze.StatusCodes.BlockedPath,
        actionError: code === newMaze.StatusCodes.NotEnoughActions
      });
    case RESET_PATHERROR: return ({ ...state, pathError:false });
    case RESET_ACTIONERROR: return ({ ...state, actionError:false });
    case RESET_MAZE: return initializeMaze(state.seed, state);
    case UPDATE_VIEWPARAMS:
      let { tileSize, rotateMaze } = calculateViewParams(state.maze, action.payload);
      return ({
        ...state,
        tileSize,
        rotateMaze,
        path: calculatePath(
            state.maze.path,
            tileSize,
            rotateMaze
        )
      });
    case INIT_MAZE: return initializeMaze(action.payload, state);
    default:
      return state;
  }
}

function initializeMaze(seed, state){
  let maze = createMaze(seed);
  return {
    ...state,
    maze,
    path: calculatePath(maze.path, 30, false)
  };
}

function calculatePath(path, tileSize, rotateMaze) {
  const tileOffset = tileSize / 2;

  const fullPath = path.reduce( (path, segment) => path.concat(segment) );

  if (rotateMaze) {
    return fullPath.map( point => ({
      x: point.y * tileSize + tileOffset,
      y: point.x * tileSize + tileOffset,
    }) );
  }
  return fullPath.map( point => ({
    x: point.x * tileSize + tileOffset,
    y: point.y * tileSize + tileOffset,
  }) );
}

function calculateViewParams(maze, windowParams){
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
    tileSize,
    rotateMaze
  };
}
