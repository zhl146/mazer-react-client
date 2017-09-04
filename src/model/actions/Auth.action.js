import Config from "../../Utils/config";
import Auth0LockPasswordless from 'auth0-lock-passwordless';
let lock = new Auth0LockPasswordless(Config.clientId, Config.domain);
export const AUTH_SET_PROFILE = 'AUTH_SET_PROFILE';
export const AUTH_SET_HASH = 'AUTH_HANDLE_HASH';
export const AUTH_ERROR = 'AUTH_ERROR';

export const setAuthHash = (dispatch, hash, id_token) => (
    {
        type: AUTH_SET_HASH,
        hash: hash,
        id_token: id_token,
        payload: lock.getProfile(hash.id_token, (err, profile) => {
            if (err) {
                dispatch(authError(err))
            } else {
                dispatch(setAuthProfile(profile))
            }
        })
    }
);

export const authError = (error) => (
    {
        type: AUTH_ERROR,
        error: error,
    }
);

export const setAuthProfile = (profile) => (
    {
        type: AUTH_SET_PROFILE,
        profile: profile
    }
);