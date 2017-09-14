import {AUTH_ERROR, AUTH_SET_PROFILE} from './Auth.action';

function calculateInitialState() {
    return {
        token: null,
        user: null,
        error: null
    };

}

let initialState = calculateInitialState();

function AuthReducer(state = initialState, action){
    switch ( action.type ) {
        case AUTH_SET_PROFILE:
            return Object.assign(
                {},
                state,
                {
                    user: action.user,
                    token: action.token
                }
            );

        case AUTH_ERROR:
            return Object.assign(
                {},
                state,
                {
                    error: action.error
                }
            );
        default:
            return state;
    }
}

export default AuthReducer;