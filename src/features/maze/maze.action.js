import CustomError from '../../utils/customError';
import {
  createErrorAction, createStartAction, createStaticAction, createSuccessAction,
  createUpdateAction
} from "../../utils/action-creator";
import {
  FETCH_HIGHSCORE,
  INIT_MAZE,
  RESET_MAZE,
  TOGGLE_HELP,
  UNDO_ACTION,
  UPDATE_VIEWPARAMS
} from "../../store/action-constants";

export const initializeMaze = seed => createUpdateAction(INIT_MAZE, seed);

export const undoAction = () => createStaticAction(UNDO_ACTION);

export const resetMaze = () => createStaticAction(RESET_MAZE);

export const toggleHelp = () => createStaticAction(TOGGLE_HELP);

export const updateView = viewParams => createUpdateAction(UPDATE_VIEWPARAMS, viewParams);

export const fetchHighScore = seed => dispatch => {
  dispatch(createStartAction(FETCH_HIGHSCORE));
  const BASE_URL = 'https://zhenlu.info/maze/leaderboard/';
  const urlArgs = "?start=0&length=1";
  fetch(BASE_URL+seed+urlArgs)
      .then( res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then( data => {
        if (data.scores.length === 0) {
          dispatch(createSuccessAction(FETCH_HIGHSCORE, 0));
        } else {
          dispatch(createSuccessAction(FETCH_HIGHSCORE, data.scores[0].score));
        }
      })
      .catch( error => {
        dispatch(createErrorAction(FETCH_HIGHSCORE, error));
      });
};

export const submitScore = ( maze, history, user, token ) => {
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