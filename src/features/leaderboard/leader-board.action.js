import {
  createErrorAction,
  createStartAction,
  createSuccessAction
} from "../../utils/action-creator";
import axios from 'axios';
import { FETCH_LEADERBOARD } from "../../store/action-constants";
import { generateScoreUrl } from "../../server/url-generator";

export const fetchLeaderBoard = seed => async dispatch => {
  dispatch(createStartAction(FETCH_LEADERBOARD));
  try {
    let { data:{scores} } = await( axios.get(generateScoreUrl(seed, 10)) );
    dispatch(createSuccessAction(
        FETCH_LEADERBOARD,
        scores
    ));
  } catch(e) {
    dispatch(createErrorAction(FETCH_LEADERBOARD, e));
  }
};