export const AUTH_SET_PROFILE = 'AUTH_SET_PROFILE';
export const AUTH_ERROR = 'AUTH_ERROR';

export const authError = error => (
    {
        type: AUTH_ERROR,
        error: error,
    }
);

export const setAuthProfile = (token, user) => (
    {
        type: AUTH_SET_PROFILE,
        token: token,
        user: user
    }
);