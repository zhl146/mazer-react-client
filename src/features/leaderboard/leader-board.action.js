import {
  createErrorAction,
  createStartAction,
  createSuccessAction
} from "../../Utils/action-creator";

export const FETCH_LEADERBOARD = 'FETCH_LEADERBOARD';
export const INIT_LEADERBOARD = 'INIT_LEADERBOARD';

const BASE_URL = 'https://zhenlu.info/maze/leaderboard/';
const args = "?start=0&length=10";

export const fetchLeaderBoard = seed => dispatch => {
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
      .catch( error => {
        dispatch(createErrorAction(FETCH_LEADERBOARD, error));
      });
};
