import {LEADERBOARD_TYPE} from "../actions/LeaderBoard.action";

function calculateInitialState() {
    return {
        scores: [],
        leaderBoardPending: true
    }
}

const initialState = calculateInitialState();

function LeaderBoardReducer(state = initialState, action){
    switch ( action.type ) {
        case `${LEADERBOARD_TYPE}_PENDING`:
            return Object.assign(
                {},
                state,
                {
                    leaderBoardPending: true
                }
            );
        break;
        case `${LEADERBOARD_TYPE}_FULFILLED`:
            return Object.assign(
                {},
                state,
                {
                    scores: action.payload.scores,
                    leaderBoardPending: false
                }
            );
        break;
        case `${LEADERBOARD_TYPE}_REJECTED`:
            return Object.assign(
                {},
                state,
                {
                    scores: [],
                    leaderBoardPending: false
                }
            );
        break;
        default:
            return state;
    }
}

export default LeaderBoardReducer;


