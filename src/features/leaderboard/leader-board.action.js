import {
  createErrorAction,
  createStartAction,
  createSuccessAction
} from "../../utils/action-creator";
import { FETCH_LEADERBOARD } from "../../store/action-constants";
import { createScoreUrl } from "../../server/url-generator";

export const fetchLeaderBoard = seed => async dispatch => {
  dispatch(createStartAction(FETCH_LEADERBOARD));
  try {
    let data = await( await( fetch(createScoreUrl(seed, 10)) ) ).json();
    dispatch(createSuccessAction(
        FETCH_LEADERBOARD,
        data.scores
    ));
  } catch(e) {
    dispatch(createErrorAction(FETCH_LEADERBOARD, e));
  }
};
