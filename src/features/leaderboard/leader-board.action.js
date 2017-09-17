import {
  createErrorAction,
  createStartAction,
  createSuccessAction
} from "../../Utils/action-creator";
import { FETCH_LEADERBOARD } from "../../store/action-constants";

export const fetchLeaderBoard = seed => dispatch => {
  const BASE_URL = 'https://zhenlu.info/maze/leaderboard/';
  const args = "?start=0&length=10";
  //ENDPOINT LOOKS LIKE : BASE_URL + :seed + ?start=:startIndex&length=:howManyScores
  dispatch(createStartAction(FETCH_LEADERBOARD));
  fetch(BASE_URL + seed + args)
      .then(( res ) => {
        if (! res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then(( data ) => {
        dispatch(createSuccessAction(
            FETCH_LEADERBOARD,
            data.scores
        ));
      })
      .catch(error => {
        dispatch(createErrorAction(FETCH_LEADERBOARD, error));
      });
};
