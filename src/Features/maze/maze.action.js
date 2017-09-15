import CustomError from '../../Utils/CustomError';

export const INIT_MAZE = 'INIT_MAZE';
export const UNDO_ACTION = 'UNDO_ACTION';
export const RESET_MAZE = 'RESET_MAZE';
export const MAZE_ERROR = 'MAZE_ERROR';
export const TOGGLE_HELP = 'TOGGLE_HELP';
export const UPDATE_BOARDVIEWPARAMS = 'UPDATE_BOARDVIEWPARAMS';

export const initializeMaze = seed => ({ type: INIT_MAZE, seed: seed });

export const undoAction = () => ({ type: UNDO_ACTION });

export const resetMaze = () => ({ type: RESET_MAZE });

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
  };
};

function submitScore( maze, history, user, token ){
  console.log("MAZE: "+JSON.stringify(maze));
  let solution = {
    seed: maze.seed,
    mazeTiles: maze.mazeTiles,
    user: user,
    token: token,
  };

  fetch('zhenlu.info/check', {
    method: "POST",
    body: JSON.stringify(solution)
  })
      .then( (res) => {
        history.push('/leaderboard/');
        if(!res.ok){
          throw CustomError("Posting back to the server failed!");
        }
        return res;
      })
      .then( res => res.json())
      .then( data => {
        console.log(data);
      })
      .catch((ex) => {
        alert("Sending your score to the server failed, if this persists please contact the admin!");
        console.log("ERROR: "+ex);
      });
}