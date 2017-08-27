import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';

export const FETCH_LEADERBOARD = 'FETCH_LEADERBOARD';
export const FETCH_LEADERBOARD_FULFILLED = 'FETCH_LEADERBOARD_FULFILLED';

export const fetchLeaderBoard = seed => ({ type: FETCH_LEADERBOARD, payload: seed });
export const fetchLeaderBoardFulfilled = payload => ({ type: FETCH_LEADERBOARD_FULFILLED, payload });

export const fetchLeaderBoardEpic = action$ =>
    action$.ofType(FETCH_LEADERBOARD)
        .mergeMap(action =>
            ajax.getJSON(`https://zhenlu.info/check/?seed=${action.payload}`)
                .map(response => fetchLeaderBoardFulfilled(response))
        );
