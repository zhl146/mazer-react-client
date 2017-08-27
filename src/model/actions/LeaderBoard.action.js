import fetch from 'isomorphic-fetch';

export const FETCH_LEADERBOARD = 'FETCH_LEADERBOARD';
export const FETCH_LEADERBOARD_FULFILLED = 'FETCH_LEADERBOARD_FULFILLED';
export const FETCH_LEADERBOARD_ERROR = 'FETCH_LEADERBOARD_ERROR';


export const fetchLeaderBoard = (dispatch, seed) => (
    {
        type: FETCH_LEADERBOARD,
        payload: fetch('http://zhenlu.info/leaderboard/'+seed).then(
            (res) => {
                console.log(res);
                if(!res.ok) {
                    throw Error(res.statusText);
                }
                res.text().then(
                    (data) => {
                        console.log(data);
                        dispatch(fetchLeaderBoardFulfilled(data.scores));
                    }
                ).catch( (err) => {
                    dispatch(fetchLeaderBoardFailed(err));
                });
            }
        ).catch( (err) => {
            dispatch(fetchLeaderBoardFailed(err));
        })
    }
);

export const fetchLeaderBoardFulfilled = payload => ({ type: FETCH_LEADERBOARD_FULFILLED, scores: payload });

export const fetchLeaderBoardFailed = (err=null) => ({
    type: FETCH_LEADERBOARD_ERROR, scores: [], error: err
});
