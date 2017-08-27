import {FETCH_LEADERBOARD_FULFILLED} from "../actions/LeaderBoard.action";

function calculateInitialState() {
    return {
        scores: [],
        leaderBoardPending: true
    }
}

const initialState = calculateInitialState();

function LeaderBoardReducer(state = initialState, action){
    switch ( action.type ) {
        // case `${LEADERBOARD_TYPE}_PENDING`:
        //     return Object.assign(
        //         {},
        //         state,
        //         {
        //             leaderBoardPending: true
        //         }
        //     );
        case FETCH_LEADERBOARD_FULFILLED:
            return Object.assign(
                {},
                state,
                {
                    scores: action.payload.scores,
                    leaderBoardPending: false
                }
            );
        // case `${LEADERBOARD_TYPE}_REJECTED`:
        //     return Object.assign(
        //         {},
        //         state,
        //         {
        //             scores: [],
        //             leaderBoardPending: false
        //         }
        //     );
        default:
            return state;
    }
}

export default LeaderBoardReducer;


