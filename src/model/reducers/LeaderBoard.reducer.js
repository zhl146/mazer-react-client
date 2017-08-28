import {FETCH_LEADERBOARD, FETCH_LEADERBOARD_FULFILLED, FETCH_LEADERBOARD_ERROR} from "../actions/LeaderBoard.action";
import {generateDateSeed, getUrlParameter} from "../../Utils/RequestUtils";

function calculateInitialState(seed=null) {
    if(!seed){
        seed = getUrlParameter("seed");
        seed = (seed? seed: generateDateSeed());
    }

    return {
        seed: seed,
        scores: [],
        pending: true,
        error: null
    }
}

const initialState = calculateInitialState();

function LeaderBoardReducer(state = initialState, action){
    console.log(action);
    switch ( action.type ) {
        case FETCH_LEADERBOARD:
            return Object.assign(
                {},
                state,
                {
                    leaderBoardPending: true
                }
            );
        case FETCH_LEADERBOARD_FULFILLED:
            return Object.assign(
                {},
                state,
                {
                    scores: action.scores,
                    leaderBoardPending: false,
                    seed: action.seed
                }
            );
        case FETCH_LEADERBOARD_ERROR:
            return Object.assign(
                {},
                state,
                {
                    scores: [],
                    leaderBoardPending: false,
                    error: action.error
                }
            );
        default:
            return state;
    }
}

export default LeaderBoardReducer;


