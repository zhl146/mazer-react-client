import { createMaze } from 'mazer-shared';
import { cloneDeep } from 'lodash';

import {
  INIT_MAZE,
  MAZE_ERROR,
  RESET_MAZE,
  TOGGLE_HELP,
  UPDATE_BOARDVIEWPARAMS
} from "./maze.action";
import { CLICK_TILE } from "./maze-game-board/maze-tile.action";

const initialState = {
  seed: null,
  maze: null,
  path: null,
  pathError: false,
  rotateMaze: false,
  tileSize: 30,
  displayHelp: false,
};

function MazeReducer(state = initialState, action){
  switch ( action.type ) {
    case INIT_MAZE:
      return Object.assign(
          {},
          state,
          initializeMaze(action.seed)
      );
    case CLICK_TILE:
      let newMaze = cloneDeep(state.maze);
      newMaze.doActionOnTile(action.tile);
      return Object.assign(
          {},
          state,
          {
            maze: newMaze,
            path: calculatePath(newMaze.path,
                state.tileSize,
                state.rotateMaze)
          }
      );
    case MAZE_ERROR:
      return Object.assign(
          {},
          state,
          action.payload
      );

    case RESET_MAZE:
      return Object.assign(
          {},
          state,
          initializeMaze(state.seed)
      );

    case TOGGLE_HELP:
      return Object.assign(
          {},
          state,
          {displayHelp: !state.displayHelp});

    case UPDATE_BOARDVIEWPARAMS:
      return Object.assign(
          {},
          state,
          action.payload,
          { path: calculatePath(state.maze.path, action.payload.tileSize, action.payload.rotateMaze) }
      );

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

export default MazeReducer;