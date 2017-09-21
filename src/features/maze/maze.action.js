import axios from 'axios';

import {
  createErrorAction,
  createStartAction,
  createStaticAction,
  createSuccessAction,
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

import { generateScoreUrl, solutionUrl } from "../../server/url-generator";


export const undoAction = () => createStaticAction(UNDO_ACTION);
export const resetMaze = () => createStaticAction(RESET_MAZE);
export const toggleHelp = () => createStaticAction(TOGGLE_HELP);
export const initializeMaze = seed => createUpdateAction(INIT_MAZE, seed);
export const updateView = viewParams => createUpdateAction(UPDATE_VIEWPARAMS, viewParams);

export const fetchHighScore = seed => async dispatch => {
  dispatch(createStartAction(FETCH_HIGHSCORE));
  try{
    let { data: {scores} } = await(axios.get(generateScoreUrl(seed, 1)));
    if (scores.length === 0) {
      dispatch(createSuccessAction(FETCH_HIGHSCORE, 0));
    } else {
      dispatch(createSuccessAction(FETCH_HIGHSCORE, scores[0].score));
    }
  } catch(e) {
    dispatch(createErrorAction(FETCH_HIGHSCORE, e));
  }
};

export const submitScore = ( maze, history, user, token ) => async dispatch => {
  let payload = {
    seed: maze.seed,
    solution: maze.getUserChanges(),
    user: user,
    token: token,
  };
  try {
    let response = await( axios.post(solutionUrl, JSON.stringify(payload)) );
    console.log(response);
  } catch(e) {
    console.log(e);
  }
};