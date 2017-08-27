export const FETCH_LEADERBOARD = 'FETCH_LEADERBOARD';
export const FETCH_LEADERBOARD_FULFILLED = 'FETCH_LEADERBOARD_FULFILLED';

export const fetchLeaderBoard = seed => ({ type: FETCH_LEADERBOARD, payload: seed });
export const fetchLeaderBoardFulfilled = payload => ({ type: FETCH_LEADERBOARD_FULFILLED, payload });

