export const FETCH_LEADERBOARD = 'FETCH_LEADERBOARD';
export const FETCH_LEADERBOARD_FULFILLED = 'FETCH_LEADERBOARD_FULFILLED';
export const FETCH_LEADERBOARD_ERROR = 'FETCH_LEADERBOARD_ERROR';

const BASE_URL = 'https://zhenlu.info/maze/leaderboard/';
const args = "?start=0&length=10";

export const fetchLeaderBoard = (dispatch, seed) => (
    {
      type: FETCH_LEADERBOARD,
      //ENDPOINT LOOKS LIKE : BASE_URL + :seed + ?start=:startIndex&length=:howManyScores
      payload: fetch(BASE_URL+seed+args)
          .then( (res) => {
            if (! res.ok) {
              throw Error(res.statusText);
            }
            return res;
          })
          .then( res => res.json())
          .then( (data) => {
            console.log(data);
            dispatch(fetchLeaderBoardFulfilled(data.scores, seed));
          })
          .catch( (err) => {
            dispatch(fetchLeaderBoardFailed(err));
          })
    }
);

export const fetchLeaderBoardFulfilled = (payload, seed) => ({
  type: FETCH_LEADERBOARD_FULFILLED,
  scores: payload,
  seed: seed
});

export const fetchLeaderBoardFailed = (err=null) => ({
  type: FETCH_LEADERBOARD_ERROR, scores: [], error: err
});
