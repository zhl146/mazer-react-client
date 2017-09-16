import CustomError from '../../Utils/CustomError';

export const INIT_MAZE = 'INIT_MAZE';
export const UNDO_ACTION = 'UNDO_ACTION';
export const RESET_MAZE = 'RESET_MAZE';
export const RESET_PATHERROR = 'RESET_PATHERROR';
export const RESET_ACTIONERROR = 'RESET_ACTIONERROR';
export const TOGGLE_HELP = 'TOGGLE_HELP';
export const UPDATE_VIEWPARAMS = 'UPDATE_VIEWPARAMS';
export const UPDATE_HIGHSCORE = 'UPDATE_HIGHSCORE';
export const FETCH_HIGHSCORE = 'FETCH_HIGHSCORE';

export const initializeMaze = seed => ({ type: INIT_MAZE, seed: seed });

export const undoAction = () => ({ type: UNDO_ACTION });

export const resetMaze = () => ({ type: RESET_MAZE });

export const toggleHelp = () => ({ type: TOGGLE_HELP });

export const updateView = viewParams => ({ type: UPDATE_VIEWPARAMS, viewParams });

export const updateHighScore = score => ({ type: UPDATE_HIGHSCORE, score});

export const fetchHighScore = (dispatch, seed) => {
  console.log('fetch high score');
  const BASE_URL = 'https://zhenlu.info/maze/leaderboard/';
  const urlArgs = "?start=0&length=10";
  return ({
    type: FETCH_HIGHSCORE,
    payload: fetch(BASE_URL+seed+urlArgs).then( res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    }).then( data => {
      console.log(data);
      if (data.scores.length === 0) {
        dispatch(updateHighScore(0));
      } else {
        dispatch(updateHighScore(data.scores[0].score));
      }
    }).catch( err => {
      console.log(err);
    })
  });
};

export const submitScore = ( maze, history, user, token ) => {
  console.log("MAZE: "+JSON.stringify(maze));
  let solution = {
    seed: maze.seed,
    mazeTiles: maze.mazeTiles,
    user: user,
    token: token,
  };

  fetch('zhenlu.info/check',
      {
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
};