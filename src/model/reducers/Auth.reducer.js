import Auth0LockPasswordless from 'auth0-lock-passwordless';
import Config from '../../Utils/config.js';
import {AUTH_ERROR, AUTH_SET_HASH, AUTH_SET_PROFILE} from '../actions/Auth.action'

function calculateInitialState() {
    let lock = new Auth0LockPasswordless(Config.clientId, Config.domain);
    let authState = {
        hash: null,
        id_token: null,
        lock: lock,
        profile: null,
        error: null
    };
    console.log(lock);
    let hash = lock.parseHash(window.location.hash);
    if(hash && hash.error){
        authState.error = 'There was an error: '+ hash.error + ' -- ' + hash.error_description;
    }
    else if(hash && hash.id_token){
        authState.hash = hash;
        authState.id_token = hash.id_token;
    }
    return authState;

}

let initialState = calculateInitialState();

function AuthReducer(state = initialState, action){
    switch ( action.type ) {
        case AUTH_SET_PROFILE:
            return Object.assign(
                {},
                state,
                {
                    profile: action.profile
                }
            );
        case AUTH_SET_HASH:
            return Object.assign(
                {},
                state,
                {
                    hash: action.hash,
                    id_token: action.id_token
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