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
    path: calculatePath(30, false),
    pathError: false,
    rotateMaze: false,
    tileSize: 30,
    helpDisplay: false,
  }
}

function calculatePath(tileSize, rotateMaze) {

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
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
}

export default MazeReducer;