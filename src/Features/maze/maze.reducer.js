import { createMaze } from 'mazer-shared';
import { cloneDeep } from 'lodash';

import {
  INIT_MAZE,
  RESET_PATHERROR,
  RESET_MAZE,
  TOGGLE_HELP,
  UPDATE_VIEWPARAMS,
  RESET_ACTIONERROR
} from "./maze.action";
import { CLICK_TILE } from "./maze-game-board/maze-tile.action";

export const initialState = {
  seed: null,
  maze: null,
  path: null,
  pathError: false,
  actionError: false,
  rotateMaze: false,
  tileSize: 30,
  displayHelp: false,
};

export default function MazeReducer(state = initialState, action){
  switch ( action.type ) {
    case CLICK_TILE:
      let newMaze = cloneDeep(state.maze);
      let code = newMaze.doActionOnTile(action.tile);
      let pathError = false;
      let actionError = false;
      if (code === newMaze.StatusCodes.BlockedPath) pathError = true;
      else if (code === newMaze.StatusCodes.NotEnoughActions) actionError = true;
      return ({
        ...state,
        maze: newMaze,
        path: calculatePath(
            newMaze.path,
            state.tileSize,
            state.rotateMaze
        ),
        pathError,
        actionError
      });
    case RESET_PATHERROR:
      return ({
        ...state,
        pathError:false
      });
    case RESET_ACTIONERROR:
      return ({
        ...state,
        actionError:false
      });
    case UPDATE_VIEWPARAMS:
      let { tileSize, rotateMaze } = calculateViewParams(state.maze, action.viewParams);
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
    case RESET_MAZE:
      return ({
        ...state,
        ...initializeMaze(state.seed)
      });
    case TOGGLE_HELP:
      return ({
        ...state,
        displayHelp: !state.displayHelp
      });
    case INIT_MAZE:
      return ({
        ...state,
        ...initializeMaze(action.seed)
      });
    default:
      return state;
  }
}

function initializeMaze(seed){
  let maze = createMaze(seed);
  return {
    seed,
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
