import shared from 'mazer-shared';
import { getUrlParameter, generateDateSeed } from '../../Utils/RequestUtils';
import {
  MAZE_ACTION,
  MAZE_CREATE,
  MAZE_ERROR,
  MAZE_RESET,
  TOGGLE_HELP,
  UPDATE_BOARDVIEWPARAMS } from "./Maze.action";

function calculateInitialState(seed=null){
  if(!seed){
    seed = getUrlParameter("seed");
    seed = (seed? seed: generateDateSeed());
  }
  console.log("Seed is: "+seed);
  let maze = shared.Maze(seed);
  console.log("maze seed is: "+maze.seed);
  return {
    seed,
    maze,
    path: calculatePath(maze.path, 30, false),
    pathError: false,
    rotateMaze: false,
    tileSize: 30,
    helpDisplay: false,
  }
}

function calculatePath(path, tileSize, rotateMaze) {
  const tileOffset = tileSize / 2;

  const fullPath = path.reduce( (path, segment) => path.concat(segment) );

  if (rotateMaze) {
    return fullPath.map( point => ({
      x: point.y * tileSize + tileOffset,
      y: point.x * tileSize + tileOffset,
    }) )
  }
  return fullPath.map( point => ({
    x: point.x * tileSize + tileOffset,
    y: point.y * tileSize + tileOffset,
  }) )
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
          action.payload,
          { path: calculatePath(action.payload.maze.path, state.tileSize, state.rotateMaze) }
      );
    case MAZE_ERROR:
      return Object.assign(
          {},
          state,
          action.payload
      );
    case MAZE_RESET:
      let newMaze = shared.Maze(action.seed);
      let initialPath = newMaze.findPath();
      return Object.assign(
          {},
          state,
          {
            maze: newMaze,
            path: initialPath,
          }
      );

    case TOGGLE_HELP:
      return Object.assign({}, state, {helpDisplay: !state.helpDisplay});

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

export default MazeReducer;